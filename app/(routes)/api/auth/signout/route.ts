import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { deleteSignout } from '@/app/services/authentication.service.ts';
import { signOut } from '@/auth.ts';

export async function GET() {
	const token = cookies().get('accessToken');
	if (!token?.value) return;

	deleteSignout(token.value);

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
