import { signout } from '@/app/(routes)/(main)/main/actions/siginout.action.ts';
import { auth, signIn } from '@/auth.ts';

export default async function LoginTest() {
	const session = await auth();
	const isLogined = !!session;

	return (
		<div>
			{!isLogined && (
				<form
					action={async formData => {
						'use server';
						console.log('server action<formData>: ', formData.get('email'));
						try {
							const result = await signIn('credentials', formData);
							console.log('------result-------', result);
							// await signIn('credentials', {
							// 	...Object.fromEntries(formData.entries()),
							// 	redirect: false,
							// });
						} catch (err) {
							console.log('signIn action error', err);
						}
					}}
				>
					<input name="email" type="email" placeholder="Email" />
					<br />
					<button type="submit">login</button>
				</form>
			)}
			{isLogined && (
				<form action={signout}>
					<button type="submit">logout</button>
				</form>
			)}
		</div>
	);
}
