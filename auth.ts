import NextAuth, { User } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cookies } from 'next/headers';

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
			console.log('next auth middleware ', auth, 'cookies');
			if (nextUrl.pathname === '/main/restaurants/0') {
				return false;
			}
			if (nextUrl.pathname === '/main/restaurants/1') {
				console.log('nextUrl: ', nextUrl);
				return Response.redirect(new URL('/main', nextUrl));
			}

			return true;
		},
	},
	providers: [
		credentials({
			async authorize(credentials) {
				console.log('credentials authorize: ', credentials);

				// 회원 가입 로직
				// const res = await fetch('http://15.164.94.57:8080/api/user/signup', {
				// 	method: 'POST',
				// 	headers: {
				// 		'Content-Type': 'application/json',
				// 	},
				// 	body: JSON.stringify({
				// 		email: credentials.email,
				// 		password: credentials.password,
				// 		name: 'test1',
				// 		nickname: 'test1',
				// 		phone: '001-0000-0001',
				// 	}),
				// 	cache: 'no-store',
				// });

				try {
					// 로그인 로직
					const response = await fetch(
						'http://15.164.94.57:8080/api/user/login',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								email: 'test@test.com',
								password: 'aaaa',
							}),
							cache: 'no-store',
						},
					);

					const data = await response.json();
					console.log('login response data: ', data, 'ok? ', response.ok);

					if (!response.ok) {
						const error = new Error('Login Failed!');
						error.message = data.msg;
						throw error;
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

					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					const user: User = {
						id: '0',
						name: 'tester',
						email: 'test@test.com',
						image: '',
					};

					return user;
				} catch (error) {
					console.error('Login Fetch Error: ', error);
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
