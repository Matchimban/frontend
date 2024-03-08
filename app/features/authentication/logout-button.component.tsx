import { signout } from '@/app/(routes)/(home)/actions/siginout.action';

export default function LogoutButton() {
	return (
		<form action={signout}>
			<button type="submit">로그아웃</button>
		</form>
	);
}
