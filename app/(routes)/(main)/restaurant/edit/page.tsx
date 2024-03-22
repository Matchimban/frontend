import { notFound } from 'next/navigation';

import RestaurantEdit from '@/app/features/restaurant/restaurant-edit.component.tsx';
import { getRestaurant } from '@/app/services/restaurant.service.ts';

type Props = {
	searchParams: {
		id: string; //restaurantId
	};
};

export default async function Page({ searchParams }: Props) {
	const { data: restaurant } = await getRestaurant(searchParams.id);

	if (!restaurant) notFound();

	return (
		<div className="flex min-h-svh w-full max-w-xl justify-center ">
			<section className="w-full max-w-lg border bg-slate-50">
				<div className="flex items-center bg-slate-200 px-4 py-2">
					<h2 className="text-lg">매장 수정</h2>
				</div>

				<div className="my-4 px-6 sm:px-10">
					<RestaurantEdit restaurant={restaurant} />
				</div>
			</section>
		</div>
	);
}
