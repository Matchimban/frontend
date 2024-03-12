import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { baseUrl } from '@/app/constants/path.ts';
import { signOut } from '@/auth.ts';

export async function GET() {
	const token = cookies().get('accessToken');
	if (!token?.value) return;

	try {
		const response = await fetch(baseUrl + '/api/user/logout', {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token.value}`,
			},
		});

		const data = await response.json();
		if (!response.ok) throw data;
	} catch (error) {
		console.error('Logout failed! ', error);
	}

	const logoutResponse = NextResponse.next();
	logoutResponse.cookies.delete('accessToken');
	logoutResponse.cookies.delete('refreshToken');
	logoutResponse.cookies.delete('user');
	logoutResponse.cookies.delete('expiration');

	await signOut({
		redirect: false,
	});

	return logoutResponse;
}
