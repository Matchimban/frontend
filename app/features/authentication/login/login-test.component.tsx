'use client';

export default function Login() {
	const handleLogin = async () => {
		const res = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: 'test@test.com',
				password: 'aaaa',
			}),
		});

		const data = await res.json();

		console.log('login result: ', data);
	};

	return <button onClick={handleLogin}>login</button>;
}
