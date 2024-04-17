import { ReactNode } from 'react';

import { MenuCategory } from '@/app/features/restaurant/_types.ts';
import RestaurantPreviewSlick from '@/app/features/restaurant/restaurant-preview-slick.component';
import { getRestaurantPreviews } from '@/app/services/restaurant.service.ts';
import '@/mocks/msw/index.ts';

export const dynamic = 'force-dynamic';

export default async function Page() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { data, error: restaurantPreviewsError } =
		await getRestaurantPreviews();

	if (!data) return <p>{restaurantPreviewsError}</p>;

	const restaurantPreviews = data?.reverse();

	return (
		<div className="flex min-h-svh w-full max-w-3xl flex-col">
			<div className="flex flex-col gap-4 sm:my-2">
				<Section title="전체 보기">
					<RestaurantPreviewSlick restaurantPreviews={restaurantPreviews} />
				</Section>

				<Section title="카테고리 살펴보기">
					<Category category={MenuCategory.KOREA}>
						<RestaurantPreviewSlick
							restaurantPreviews={restaurantPreviews.filter(
								restaurantPreview => restaurantPreview.category === 'KOREA',
							)}
						/>
					</Category>

					<Category category={MenuCategory.JAPAN}>
						<RestaurantPreviewSlick
							restaurantPreviews={restaurantPreviews.filter(
								restaurantPreview => restaurantPreview.category === 'JAPAN',
							)}
						/>
					</Category>

					<Category category={MenuCategory.CHINA}>
						<RestaurantPreviewSlick
							restaurantPreviews={restaurantPreviews.filter(
								restaurantPreview => restaurantPreview.category === 'CHINA',
							)}
						/>
					</Category>
				</Section>
			</div>
		</div>
	);
}

function Section({ children, title }: { children: ReactNode; title: string }) {
	return (
		<section className="border sm:rounded-lg sm:bg-slate-50">
			<h2 className="mx-4 mt-4 text-xl font-bold">{title}</h2>
			<div className="flex flex-col divide-y">{children}</div>
		</section>
	);
}

function Category({
	children,
	category,
}: {
	children: ReactNode;
	category: string;
}) {
	return (
		<div className="">
			<h3 className="mx-6 mt-4 text-lg font-semibold text-gray-700">
				{category}
			</h3>
			{children}
		</div>
	);
}
