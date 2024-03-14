import NextAuth, { User } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { PROTECTED_PATH } from '@/app/constants/path.ts';
import { Credentials } from '@/app/features/authentication/_types.ts';
import {
	postRefresh,
	postSignin,
	postSignup,
} from '@/app/services/authentication.service.ts';

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
			// if 'authorized' returns false: redirect to nextauth default login page.

			const isAuthenticated = !!auth?.user;
			console.log('Middleware execute: ', isAuthenticated, request.url);

			// Protecting routes
			if (!isAuthenticated) {
				const { pathname } = request.nextUrl;
				if (PROTECTED_PATH.includes(pathname))
					return NextResponse.redirect(new URL('/', request.nextUrl.origin));
			}

			if (isAuthenticated) {
				const tokenLifeTime =
					Date.now() - Number(request.cookies.get('expiration')!.value); // 로그인은 됐는데 토큰이 없을 경우?
				const isExpired = tokenLifeTime > 59 * 60 * 1000;
				const isNeedRefresh = !isExpired && tokenLifeTime > 50 * 60 * 1000;

				// 토큰 만료시 자동 로그아웃
				if (isExpired) {
					return NextResponse.rewrite(
						new URL('/api' + '/auth/signout', request.nextUrl.origin),
					);
				}

				// 토큰 만료 5분 전 갱신 요청
				if (isNeedRefresh) {
					try {
						const accessToken = request.cookies.get('accessToken');
						const refreshToken = request.cookies.get('refreshToken');

						if (!accessToken || !refreshToken)
							throw '토큰이 존재하지 않습니다.';

						const { data: refreshData, error: refreshError } =
							await postRefresh(accessToken.value, refreshToken.value);

						if (!refreshData) throw refreshError;

						const {
							accessToken: newAccessToken,
							refreshToken: newRefreshToken,
							generatedTime,
						} = refreshData;

						const refreshResponse = NextResponse.next();

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
							new URL('/api' + '/auth/signout', request.nextUrl.origin),
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
				// return null -> 'CredentialsSignin' type error
				// throw ~ -> 'CallbackRouteError' type error

				// console.log('credentials authorize: ', credentials);
				const { email, password, name, nickname } =
					credentials as unknown as Credentials;

				if (name) {
					// 회원 가입 로직
					const { error: signUpError } = await postSignup({
						email,
						password,
						name,
						nickname,
						phone: '000-0000-0000',
					});

					if (signUpError) {
						return null;
					}
				}

				// 로그인 로직
				const { data: signInResult, error: sigInError } = await postSignin({
					email,
					password,
				});

				if (!signInResult) {
					console.error('Invalid Credentials: ', sigInError);
					return null;
				}

				const { accessToken, refreshToken, userInfo, generatedTime } =
					signInResult;

				const { userId, nickname: userName } = userInfo;

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
					value: userName,
				});

				const user: User = {
					id: userId + '',
					name,
					email,
					image: '',
				};

				return user;
			},
		}),
	],
});
