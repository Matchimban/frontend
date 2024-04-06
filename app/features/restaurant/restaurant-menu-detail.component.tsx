import Image from 'next/image';

import { RestaurantMenu } from '@/app/features/restaurant/_types.ts';

type Prop = {
	restaurantMenus: RestaurantMenu[] | null;
	errorMessage: string | null;
};

export default function RestaurantMenus({
	restaurantMenus,
	errorMessage,
}: Prop) {
	return (
		<ul className="flex flex-wrap gap-4 sm:max-w-[420px]">
			{restaurantMenus?.map(restaurantMenu => (
				<li key={restaurantMenu.id} className="flex flex-col text-xs">
					<div className="relative h-32 w-32 flex-initial overflow-hidden rounded-xl ">
						<Image
							src={restaurantMenu.imageUrl[0].savedFileUrl}
							alt="menu image"
							className="object-cover"
							fill
							sizes="128px"
						/>
					</div>

					<div className="flex flex-col px-1 font-semibold">
						<span className="text-sm">{restaurantMenu.name}</span>
						<span>{restaurantMenu.price}원</span>
					</div>
				</li>
			))}

			{errorMessage && <span>{errorMessage}</span>}
			{restaurantMenus?.length === 0 && <span>메뉴 준비중...</span>}
		</ul>
	);
}
