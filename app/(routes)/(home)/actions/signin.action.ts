'use server';

// import { AuthError } from 'next-auth';
import { signIn } from '@/auth.ts';

export const signin = async (formdata: FormData) => {
	// try {
	await signIn('credentials', {
		...formdata,
		redirect: false,
	});
	// *** NEXT_REDIRECT 오류 원인 찾기 ***
	// const redirectUrl = await signIn('credentials', {
	// 	...formdata,
	// 	redirect: false,
	// });
	// } catch (error) {
	// if (isRedirectError(error)) {
	// 	console.error('SignIn redirect error!');
	// }

	// if (error instanceof Error) {
	// 	const { type, cause } = error as AuthError;
	// 	switch (type) {
	// 		case 'CredentialsSignin':
	// 			return 'Invalid credentials.';
	// 		case 'CallbackRouteError':
	// 			return cause?.err?.toString();
	// 		default:
	// 			return error.message;
	// 	}
	// }

	// throw error;
	// }
};
