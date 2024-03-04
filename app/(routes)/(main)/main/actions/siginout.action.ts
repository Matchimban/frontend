'use server';

import { cookies } from 'next/headers';

import { signOut } from '@/auth.ts';

export const signout = async () => {
	cookies().delete('accessToken');
	cookies().delete('refreshToken');
	await signOut();
};
