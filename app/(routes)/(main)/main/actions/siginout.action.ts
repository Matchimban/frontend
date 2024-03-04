'use server';

import { cookies } from 'next/headers';

import { signOut } from '@/auth.ts';

export const signout = async () => {
	await signOut({
		redirect: false,
	});
	cookies().delete('accessToken');
	cookies().delete('refreshToken');
};
