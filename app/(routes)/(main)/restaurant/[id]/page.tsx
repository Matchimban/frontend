import { notFound } from 'next/navigation';

import EditButton from '@/app/features/restaurant/edit-button.component.tsx';
import RestaurantDetail from '@/app/features/restaurant/restaurant-detail.component.tsx';
import {
	getRestaurant,
	getRestaurantPreviews,
} from '@/app/services/restaurant.service.ts';

type Props = {
	params: {
		id: string;
	};
};

export async function generateStaticParams() {
	const { data, error } = await getRestaurantPreviews();

	if (!data) throw error;

	return data.map(restaurant => ({
		id: restaurant.id.toString(),
	}));
}

export default async function Page({ params }: Props) {
	const { data: restaurant, error: restaurantError } = await getRestaurant(
		params.id,
	);

	if (!restaurant) notFound();

	return (
		<div className="flex max-w-3xl justify-center">
			<div className="mb-4 flex max-w-2xl flex-col space-y-4 divide-y-8 overflow-x-hidden sm:mt-4 sm:items-center sm:divide-y-0">
				<section className="flex w-full flex-col space-y-4 sm:rounded-lg sm:border sm:bg-slate-50 sm:p-4">
					{restaurant && (
						<RestaurantDetail
							restaurant={restaurant}
							errorMessage={restaurantError}
						/>
					)}

					<div className="flex justify-end px-2">
						<EditButton
							userId={restaurant.userId}
							restaurantId={restaurant.id}
						/>
					</div>
				</section>

				<section className="flex w-full flex-col space-y-2 sm:rounded-lg sm:border sm:bg-slate-50 sm:p-4">
					<div className="p-4 sm:p-0">
						<h3 className="text-md font-semibold">메뉴</h3>
						<div>
							<span>없음</span>
						</div>
					</div>

					<div>
						{/* <span className="flex justify-end px-2">수정하기</span> */}
					</div>
				</section>
			</div>
		</div>
	);
}
