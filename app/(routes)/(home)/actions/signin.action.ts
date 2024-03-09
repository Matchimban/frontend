'use server';

// import { AuthError } from 'next-auth';
import { signIn } from '@/auth.ts';

export const signin = async (formdata: FormData) =>
	await signIn('credentials', formdata);
// {
// try {

// } catch (error) {
// 	if (error instanceof AuthError) {
// 		const { type, cause } = error;
// 		switch (type) {
// 			case 'CredentialsSignin':
// 				return '입력하신 정보가 잘못 되었습니다.';
// 			case 'CallbackRouteError':
// 				return cause?.err?.toString();
// 			default:
// 				return 'Something went wrong.';
// 		}
// 	}

// 	throw error;
// }
// };
