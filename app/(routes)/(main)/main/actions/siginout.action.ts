'use server';

import { cookies } from 'next/headers';

import { baseUrl } from '@/app/constants/path.ts';
import { signOut } from '@/auth.ts';

export const signout = async () => {
	const token = cookies().get('accessToken');

	if (!token?.value) return;

	const response = await fetch(baseUrl + '/api/user/logout', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token.value}`,
		},
	});

	const data = await response.json();
	if (!response.ok) {
		console.error(data);
		throw data;
	}

	cookies().delete('accessToken');
	cookies().delete('refreshToken');

	await signOut();
};
