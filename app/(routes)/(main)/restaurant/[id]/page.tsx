import RestaurantDetail from '@/app/features/restaurant/restaurant-detail.component.tsx';
import { getRestaurant } from '@/app/services/restaurant.service.ts';

type Props = {
	params: {
		id: string;
	};
};
export default async function Page({ params }: Props) {
	const { data: restaurant, error: restaurantError } = await getRestaurant(
		params.id,
	);

	return (
		<div className="flex h-dvh w-full max-w-3xl justify-center ">
			<div className="flex max-w-2xl flex-col space-y-4 overflow-x-hidden border sm:mt-4 sm:items-center sm:rounded-lg sm:p-4">
				{restaurant && (
					<RestaurantDetail
						restaurant={restaurant}
						errorMessage={restaurantError}
					/>
				)}

				<section className="flex flex-col px-4 ">
					<div>
						<h1>섹션2</h1>
					</div>
				</section>
			</div>
		</div>
	);
}
