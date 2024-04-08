import Image from 'next/image';

import { RestaurantMenu } from '@/app/features/restaurant/_types.ts';

type Props = {
	restaurantMenus: RestaurantMenu[];
};

export default function MenuFormPreview({ restaurantMenus }: Props) {
	return (
		<>
			{restaurantMenus.map(restaurantMenu => (
				<li key={restaurantMenu.id} className="flex gap-4">
					<div className="relative h-28 w-28 flex-initial overflow-hidden rounded-xl ">
						{typeof window === 'undefined' ? (
							// 서버에서 이미지를 렌더링 할 때
							<Image
								src={restaurantMenu.imageUrl[0].savedFileUrl}
								alt="menu image"
								className="object-cover"
								fill
								sizes="112px"
							/>
						) : (
							// 클라이언트에서 이미지를 렌더링 할 때
							<img
								alt="menu image"
								src={restaurantMenu.imageUrl[0].savedFileUrl}
								className="h-28 w-28"
							/>
						)}
					</div>

					<div className="text-md flex flex-col gap-2 py-2">
						<div className="flex gap-4">
							<span>메뉴 이름</span>
							<span>{restaurantMenu.name}</span>
						</div>

						<div className="flex gap-4">
							<span>메뉴 가격</span>
							<span>{restaurantMenu.price}원</span>
						</div>
					</div>
				</li>
			))}
		</>
	);
}
