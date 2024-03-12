import NextAuth, { User } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { baseUrl } from '@/app/constants/path.ts';
import {
	AuthResponseData,
	Credentials,
} from '@/app/features/authentication/_types.ts';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	callbacks: {
		// async signIn(params) {
		// 	console.log('signIn ______ ', params);
		// 	return true;
		// },
		// async redirect(params) {
		// 	console.log('redirect ______ : ', params);
		// 	return '/';
		// },
		// async session(params) {
		// 	console.log('session ______ : ', params);
		// 	return params.session;
		// },
		// async jwt(params) {
		// 	console.log('jwt ______ : ', params);
		// 	return param.token;
		// },
		async authorized({ auth, request }) {
			// if return false: redirect to nextauth default login page;
			const isAuthenticated = !!auth?.user;
			console.log('middle ware: ', isAuthenticated, request.url);

			// Protecting routes
			if (!isAuthenticated) {
				const { pathname } = request.nextUrl;
				if (['/register'].includes(pathname))
					return NextResponse.redirect(new URL('/', request.nextUrl.origin));
			}

			if (isAuthenticated) {
				const tokenLifeTime =
					Date.now() - Number(request.cookies.get('expiration')!.value); // 토큰이 없을 경우?
				const isExpired = tokenLifeTime < 0;
				const isNeedRefresh = !isExpired && tokenLifeTime < 5 * 60 * 1000;

				// 토큰 만료시 자동 로그아웃
				if (isExpired) {
					return NextResponse.rewrite(
						new URL('/api/auth/signout', request.nextUrl.origin),
					);
				}

				// 토큰 만료 5분 전 갱신 요청
				if (isNeedRefresh) {
					try {
						const accessToken = request.cookies.get('accessToken')!.value;
						const refreshToken = request.cookies.get('refreshToken')!.value;

						const response = await fetch(baseUrl + '/api/user/refresh', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								Authorization: `Bearer ${accessToken}`,
							},
							body: JSON.stringify({
								accessToken,
								refreshToken,
							}),
						});
						const data: AuthResponseData = await response.json();

						if (!data.result) throw data?.msg ?? '';

						const refreshResponse = NextResponse.next();

						const {
							accessToken: newAccessToken,
							refreshToken: newRefreshToken,
							generatedTime,
						} = data.result;

						request.cookies.set('accessToken', newAccessToken);
						request.cookies.set('refreshToken', newRefreshToken);
						request.cookies.set(
							'expiration',
							new Date(generatedTime).getTime() + '',
						);

						refreshResponse.cookies.set('accessToken', newAccessToken, {
							httpOnly: true,
							sameSite: 'lax',
						});
						refreshResponse.cookies.set('refreshToken', newRefreshToken, {
							httpOnly: true,
							sameSite: 'lax',
						});
						refreshResponse.cookies.set(
							'expiration',
							new Date(generatedTime).getTime() + '',
							{
								httpOnly: true,
								sameSite: 'lax',
							},
						);

						return refreshResponse;
					} catch (error) {
						console.error('Refresh failed! ', error);
						// 나중에 에러 피드백 추가 할 것
						// 갱신 실패시 로그아웃
						return NextResponse.rewrite(
							new URL('/api/auth/signout', request.nextUrl.origin),
						);
					}
				}
			}

			return true;
		},
	},
	providers: [
		credentials({
			async authorize(credentials) {
				console.log('credentials authorize: ', credentials);

				const { email, password, name, nickname } = credentials as Credentials;

				if (name) {
					// 회원 가입 로직
					try {
						const response = await fetch(baseUrl + '/api/user/signup', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								email,
								password,
								name,
								nickname,
								phone: '000-0000-0000',
							}),
							cache: 'no-store',
						});

						const data: AuthResponseData = await response.json();

						if (!data.result) {
							throw data?.msg ?? '';
						}
					} catch (error) {
						return null;
					}
				}

				try {
					// 로그인 로직
					const response = await fetch(baseUrl + '/api/user/login', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							email,
							password,
						}),
						cache: 'no-store',
					});

					const data: AuthResponseData = await response.json();

					if (!data.result) {
						// const error = new Error('Login Failed!');
						// error.message = data.msg;
						throw data?.msg ?? '';
					}

					const { accessToken, refreshToken, userInfo, generatedTime } =
						data.result;

					const { userId: id, nickname: name } = userInfo;

					cookies().set({
						name: 'accessToken',
						value: accessToken,
						httpOnly: true,
						sameSite: 'lax',
					});

					cookies().set({
						name: 'refreshToken',
						value: refreshToken,
						httpOnly: true,
						sameSite: 'lax',
					});

					cookies().set({
						name: 'expiration',
						value: new Date(generatedTime).getTime() + '',
						httpOnly: true,
						sameSite: 'lax',
					});

					cookies().set({
						name: 'user',
						value: name,
					});

					const user: User = {
						id: id + '',
						name,
						email,
						image: '',
					};

					return user;
				} catch (error) {
					console.error('Invalid Credentials: ', error);

					// return null -> 'CredentialsSignin' type error
					// throw ~ -> 'CallbackRouteError' type error
					return null;
				}
			},
		}),
	],
});

/*
nextUrl:URL
{
  href: 'http://localhost:3000/main/restaurants/0',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/main/restaurants/0',
  search: '',
  searchParams: URLSearchParams {  },
  hash: ''
}
*/
