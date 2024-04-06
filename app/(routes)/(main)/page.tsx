import RestaurantPreviews from '@/app/features/restaurant/restaurant-preview.component.tsx';
import { getRestaurantPreviews } from '@/app/services/restaurant.service.ts';

export const dynamic = 'force-dynamic';

export default async function Page() {
	const { data: restaurantPreviews, error: restaurantPreviewsError } =
		await getRestaurantPreviews();

	return (
		<div className="flex min-h-svh w-full max-w-3xl flex-col border-x">
			<div className="flex flex-col divide-y">
				<div className="mx-4 my-2">
					<span>전체 보기</span>
				</div>

				<RestaurantPreviews
					restaurantPreviews={restaurantPreviews?.reverse()}
					errorMessage={restaurantPreviewsError}
				/>
			</div>
		</div>
	);
}
