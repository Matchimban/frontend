import LoginButton from '@/app/features/authentication/login-button.component.tsx';
import { auth } from '@/auth.ts';

export default async function UserButton() {
	const session = await auth();

	if (!session?.user) return <LoginButton />;

	return <h1>user</h1>;
}
