'use server';

import { cookies } from 'next/headers';

import { baseUrl } from '@/app/constants/path.ts';
import { signOut } from '@/auth.ts';

export const signout = async () => {
	const token = cookies().get('accessToken');
	// const refresh = cookies().get('refreshToken');

	if (!token?.value) return;

	try {
		const response = await fetch(baseUrl + '/api/user/logout', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token.value}`,
			},
		});

		const data = await response.json();
		if (!response.ok) throw data;
	} catch (error) {
		console.error('Logout failed! ', error);

		// access token 재발급
		// const response2 = await fetch(baseUrl + '/api/user/refresh', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${refresh}`,
		// 	},
		// 	body: JSON.stringify({
		// 		accessToken: token,
		// 		refreshToken: refresh,
		// 	}),
		// });

		// const data2 = await response2.json();
		// console.log('dddd: ', data2);

		return;
	}

	cookies().delete('accessToken');
	cookies().delete('refreshToken');
	cookies().delete('user');

	await signOut();
};
