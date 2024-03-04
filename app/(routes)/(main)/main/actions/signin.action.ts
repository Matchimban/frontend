'use server';

import { AuthError } from 'next-auth';

import { signIn } from '@/auth.ts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const signin = async (formdata: FormData) => {
	try {
		await signIn('credentials', formdata);
	} catch (error) {
		if (error instanceof Error) {
			const { type, cause } = error as AuthError;
			switch (type) {
				case 'CredentialsSignin':
					return 'Invalid credentials.';
				case 'CallbackRouteError':
					return cause?.err?.toString();
				default:
					return 'Something went wrong.';
			}
		}

		throw error;
	}
};
