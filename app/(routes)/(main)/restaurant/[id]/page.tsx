import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

import EditButton from '@/app/features/restaurant/edit-button.component.tsx';
import RestaurantDetail from '@/app/features/restaurant/restaurant-detail.component.tsx';
import RestaurantMenus from '@/app/features/restaurant/restaurant-menu-detail.component.tsx';
import {
	getRestaurantMenus,
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

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata,
): Promise<Metadata> {
	// read route params
	const { id } = params;
	const { keywords } = await parent;

	const { data } = await getRestaurant(id);

	if (!data)
		return {
			title: {
				absolute: '맛침반',
			},
		};

	// 소개 글 길이 조정
	const introduction =
		data.introduction.length > 100
			? data.introduction.substring(0, 100).split('\n').join(' ') + '...'
			: data.introduction;

	return {
		title: data.name,
		description: introduction,
		keywords: [
			...(keywords || []),
			data.address.addrSido,
			data.address.addrSigg,
			data.address.addrEmd,
			'한식',
		],
		openGraph: {
			title: data.name + ' | ' + '맛침반',
			description: introduction,
			url: `/restaurant/${id}`,
			siteName: 'Matchimban',
			images:
				'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D',
			type: 'website',
			locale: 'ko_KR',
		},
	};
}

export default async function Page({ params }: Props) {
	const { id } = params;

	const [
		{ data: restaurant, error: restaurantError },
		{ data: restaurantMenus, error: restaurantMenusError },
	] = await Promise.all([getRestaurant(id), getRestaurantMenus(id)]);

	// const { data: restaurant, error: restaurantError } = await getRestaurant(id);
	// const { data: restaurantMenus, error: restaurantMenusError } =
	// 	await getRestaurantMenus(id);

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
						<div className="flex flex-col">
							<EditButton
								type="edit"
								userId={restaurant.userId}
								restaurantId={restaurant.id}
							/>
							<EditButton
								type="remove"
								userId={restaurant.userId}
								restaurantId={restaurant.id}
							/>
						</div>
					</div>
				</section>

				<section className="flex w-full flex-col space-y-2 sm:rounded-lg sm:border sm:bg-slate-50 sm:p-4">
					<div className="p-4 sm:p-0">
						<h3 className="mb-4 text-lg font-semibold">메뉴</h3>
						<div>
							<RestaurantMenus
								restaurantMenus={restaurantMenus}
								errorMessage={restaurantMenusError}
							/>
						</div>
					</div>

					<div>
						<div className="flex justify-end px-2">
							<EditButton
								type="menu"
								userId={restaurant.userId}
								restaurantId={restaurant.id}
							/>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
