'use server';

import { cookies } from 'next/headers';

import { signOut } from '@/auth.ts';

export const signout = async () => {
	const token = cookies().get('accessToken');

	if (!token?.value) return;

	const response = await fetch('http://15.164.94.57:8080/api/user/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			authentication: token.value,
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
