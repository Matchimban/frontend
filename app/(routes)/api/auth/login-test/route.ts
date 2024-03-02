import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		request.body;
		// const { email, password } = await request.json();
		// const res = await fetch('http://15.164.94.57:8080/api/user/login', {
		// 	method: 'POST',
		// 	cache: 'no-store',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({
		// 		email,
		// 		password,
		// 	}),
		// });
		// const data = await res.json();
		console.log('/api/login-test response: ');
		// const response = NextResponse.next();
		return NextResponse.json(
			{ message: 'hello world' },
			{ status: 200, statusText: 'correct' },
		);
	} catch (err) {
		console.log('error');
	}
}
