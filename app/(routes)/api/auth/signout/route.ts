import { cookies } from 'next/headers';

import { deleteSignout } from '@/app/services/authentication.service.ts';
import { signOut } from '@/auth.ts';

export async function GET() {
	const token = cookies().get('accessToken');
	if (!token?.value) return;

	deleteSignout(token.value);

	cookies().delete('accessToken');
	cookies().delete('refreshToken');
	cookies().delete('expiration');

	await signOut();
}
