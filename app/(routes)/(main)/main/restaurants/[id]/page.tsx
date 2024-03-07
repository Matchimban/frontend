import Image from 'next/image';

import { getDummyRestaurant } from '@/app/__mocks__/dummy-data';

type Props = {
	params: {
		id: string;
	};
};
export default async function Page({ params }: Props) {
	const { id } = params;
	const data = await getDummyRestaurant(+id);

	return (
		<div className="flex min-h-svh w-full max-w-3xl justify-center bg-green-200">
			<div className="flex max-w-2xl flex-col space-y-4 bg-white sm:mt-4 sm:items-center sm:rounded-lg sm:p-4">
				<section className="flex flex-col space-y-4">
					<div className="">
						<Image
							src={data.images}
							alt="restaurant image"
							width={500}
							height={330}
						/>
					</div>

					<div className="flex flex-col space-y-1 px-4 sm:px-0">
						<h2 className="text-xl font-semibold">{data.name}</h2>
						<h4>{data.category}</h4>
						<h4>{data.addrSido}</h4>
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
