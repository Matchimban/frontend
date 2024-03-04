import { cookies } from 'next/headers';

import { signOut } from '@/auth.ts';

export const signout = async () => {
	'use server';
	console.log('signout________');
	cookies().delete('accessToken');
	cookies().delete('refreshToken');
	try {
		await signOut();
	} catch (error) {
		console.log('signOut action error', error);
	}
};
