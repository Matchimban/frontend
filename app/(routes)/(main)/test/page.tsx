import { cookies } from 'next/headers';

import { baseUrl } from '@/app/constants/path.ts';

export default async function Page() {
	const token = cookies().get('accessToken');

	console.log('test [age toke: ', token);

	const res = await fetch(baseUrl + '/api/restaurants/5');
	const data = await res.json();
	const restaurants = data.result;
	console.log('restaurants data: ', data);

	return (
		<div className="flex min-h-svh w-full max-w-3xl flex-col bg-red-100">
			<div>
				<ul className="flex flex-col divide-y p-2 sm:grid sm:grid-cols-2 sm:divide-none ">
					<p>{JSON.stringify(restaurants)}</p>
				</ul>
			</div>
		</div>
	);
}
