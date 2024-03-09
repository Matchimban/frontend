import NextAuth, { User } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cookies } from 'next/headers';

import { baseUrl } from '@/app/constants/path.ts';
import { AuthResponseData } from '@/app/features/authentication/_types.ts';

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	// pages: {
	// 	signIn: '/main/signin',
	// },
	callbacks: {
		// async signIn(param) {
		// 	console.log('signIn ______ ', param);
		// 	return true;
		// },
		// async redirect(parma) {
		// 	console.log('redirect 실행___ : ', parma);
		// 	return '/';
		// },
		// async session(params) {
		// 	console.log('session 실행___ : ', params);
		// 	return params.session;
		// },
		// async jwt(param) {
		// 	console.log('jwt 실행___ : ', param);
		// 	return param.token;
		// },
		async authorized({ auth, request: { nextUrl } }) {
			// Protecting routes
			const isAuthenticated = !!auth?.user;

			if (nextUrl.pathname.startsWith('/user')) {
				// Redirect unauthenticated users to root page
				if (!isAuthenticated) return Response.redirect(new URL(nextUrl.origin));
			}

			return true;
		},
	},
	providers: [
		credentials({
			async authorize(credentials) {
				console.log('credentials authorize: ', credentials);

				const { email, password, name, nickname } = credentials;

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
					// console.log('login response data: ', data, 'ok? ', response.ok);

					if (!data.result) {
						// const error = new Error('Login Failed!');
						// error.message = data.msg;
						throw data?.msg ?? '';
					}

					const { accessToken, refreshToken } = data.result;

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
						name: 'user',
						value: 'test',
					});

					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const user: User = {
						id: Date.now() + '',
						name: Date.now() + '',
						email: email as string,
						image: '',
					};

					return user;
				} catch (error) {
					// console.error('Invalid credentials: ', error);
					// return null -> 'CredentialsSignin' type
					// throw ~ -> 'CallbackRouteError' type
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
