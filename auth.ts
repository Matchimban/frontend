import NextAuth, { User } from 'next-auth';
import credentials from 'next-auth/providers/credentials';
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
		async signIn(param) {
			console.log('signIn ______ ', param);
			return true;
		},
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

				const user: User = {
					id: '0',
					name: 'tester',
					email: 'test@test.com',
					image: '',
				};

				cookies().set({
					name: 'test',
					value: '11111',
					httpOnly: true,
					sameSite: 'lax',
				});
				return user;
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
