'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth.ts';

export const signin = async (formdata: FormData) => {
	try {
		await signIn('credentials', formdata);

		return {
			error: null,
		};
	} catch (error) {
		if (error instanceof AuthError) {
			// The full error is always logged on the server, if you need to debug.
			// CredentialsSignin 혹은 CallbackRouteError에 관한 로그에 대해 신경쓰지 말 것.
			// https://authjs.dev/reference/core/errors/#credentialssignin

			const { type } = error;
			switch (type) {
				case 'CredentialsSignin':
					return {
						error: '입력하신 정보가 잘못 되었습니다.',
					};
				// 		case 'CallbackRouteError':
				// 			return cause?.err?.toString();
			}
		}

		return {
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};
