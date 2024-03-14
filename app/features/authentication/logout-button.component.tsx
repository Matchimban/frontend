import { signout } from '@/app/features/authentication/_server-actions';

export default function LogoutButton() {
	return (
		<form action={signout}>
			<button>로그아웃</button>
		</form>
	);
}
