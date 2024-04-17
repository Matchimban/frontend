import Image from 'next/image';

import { RestaurantMenu } from '@/app/features/restaurant/_types.ts';
import noImage from '@/public/no-image.jpeg';

type Prop = {
	restaurantMenus: RestaurantMenu[] | null;
	errorMessage: string | null;
};

export default function RestaurantMenus({
	restaurantMenus,
	errorMessage,
}: Prop) {
	return (
		<ul className="grid grid-cols-3 gap-2 sm:max-w-[420px] sm:gap-4">
			{restaurantMenus?.map(restaurantMenu => {
				return (
					<li
						key={restaurantMenu.id}
						className="flex flex-col items-center gap-1 text-xs"
					>
						<div className="relative h-[28vw] w-[28vw] flex-initial overflow-hidden rounded-xl sm:h-32 sm:w-32">
							<Image
								src={restaurantMenu?.imageUrl[0]?.savedFileUrl ?? noImage}
								alt="menu image"
								className="object-cover"
								fill
								sizes="(max-width: 640px) 100vw, 160px"
							/>
						</div>

						<div className="flex w-[28vw] flex-col px-1 font-semibold sm:w-32">
							<span className="text-sm">{restaurantMenu.name}</span>
							<span>{restaurantMenu.price}원</span>
						</div>
					</li>
				);
			})}

			{errorMessage && <span>{errorMessage}</span>}
			{restaurantMenus?.length === 0 && <span>메뉴 준비중...</span>}
		</ul>
	);
}
