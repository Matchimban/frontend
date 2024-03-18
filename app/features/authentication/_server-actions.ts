'use server';

import { AuthError } from 'next-auth';
import { cookies } from 'next/headers';

import { deleteSignout } from '@/app/services/authentication.service.ts';
import { signOut } from '@/auth.ts';
import { signIn } from '@/auth.ts';

export const signin = async (formdata: FormData) => {
	try {
		await signIn('credentials', {
			...formdata,
			redirect: false,
		});

		return {
			error: null,
		};
	} catch (error) {
		if (error instanceof AuthError) {
			// The full error is always logged on the server, if you need to debug.
			// CredentialsSignin 혹은 CallbackRouteError에 관한 로그에 대해 신경쓰지 말 것.
			// https://authjs.dev/reference/core/errors/#credentialssignin

			const { type, cause } = error;
			switch (type) {
				case 'CredentialsSignin':
					return {
						error: '입력하신 정보가 잘못 되었습니다.',
					};
				case 'CallbackRouteError':
					console.error('CallbackRouteError', cause?.err?.toString());
					return {
						error: null,
					};
			}
		}

		// if (isRedirectError(error)) {
		// 	console.error('SignIn redirect error!');
		//  return{
		// 	error: null,
		// };
		// }

		return {
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};

export const signout = async () => {
	const token = cookies().get('accessToken');
	// const refresh = cookies().get('refreshToken');

	if (!token?.value) return;

	deleteSignout(token.value);

	cookies().delete('accessToken');
	cookies().delete('refreshToken');
	cookies().delete('user');
	cookies().delete('expiration');

	await signOut();
};