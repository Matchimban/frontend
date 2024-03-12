import { cookies } from 'next/headers';

import { baseUrl } from '@/app/constants/path.ts';

export default async function Page() {
	const token = cookies().get('accessToken');

	console.log('test [age toke: ', token);

	const res = await fetch(baseUrl + '/api/restaurants', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token!.value}`,
		},
	});
	const data = await res.json();
	console.log('restaurants data: ', data);

	return (
		<div className="flex min-h-svh w-full max-w-3xl flex-col bg-red-100">
			<div>
				<ul className="flex flex-col divide-y p-2 sm:grid sm:grid-cols-2 sm:divide-none ">
					<p>{JSON.stringify(data)}</p>
				</ul>
			</div>
		</div>
	);
}
