import { signout } from '@/app/(routes)/(main)/main/actions/siginout.action.ts';

export default function LogoutButton() {
	return (
		<form action={signout}>
			<button type="submit">로그아웃</button>
		</form>
	);
}
