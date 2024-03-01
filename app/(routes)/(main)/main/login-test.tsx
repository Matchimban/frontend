export default async function LoginTest() {
	return (
		<div>
			<form
				action={async formData => {
					'use server';
					console.log('server action<formData>: ', formData.get('email'));
				}}
			>
				<input name="email" type="email" placeholder="Email" />
				<br />
				<button type="submit">login</button>
			</form>
		</div>
	);
}
