import Image from 'next/image';

import { baseUrl } from '@/app/constants/path.ts';
import { Restaurant } from '@/app/features/restaurants/_types.ts';
import { ResponseData } from '@/app/types/index.ts';

type Props = {
	params: {
		id: string;
	};
};
export default async function Page({ params }: Props) {
	const { id } = params;
	const res = await fetch(baseUrl + '/api/restaurants/' + id);
	const data: ResponseData<Restaurant> = await res.json();
	const restaurants = data.result;

	return (
		<div className="flex min-h-svh w-full max-w-3xl justify-center ">
			<div className="flex max-w-2xl flex-col space-y-4 overflow-x-hidden border sm:mt-4 sm:items-center sm:rounded-lg sm:p-4">
				<section className="flex flex-col space-y-4">
					<div className="relative h-[40vh] w-screen overflow-hidden sm:max-w-[420px]">
						<Image
							src={
								'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D'
							}
							alt="restaurant image"
							fill
							sizes="(max-width: 400px) 100vw, 400px"
							className="object-cover"
						/>
					</div>

					<div className="flex flex-col space-y-1 px-4 sm:px-0">
						<h2 className="text-xl font-semibold">{restaurants.name}</h2>
						<h4>{restaurants.category}</h4>
						<h4>{restaurants.address.addrSido}</h4>
					</div>
				</section>

				<section className="flex flex-col px-4 ">
					<div>
						<h1>섹션2</h1>
					</div>
				</section>
			</div>
		</div>
	);
}
