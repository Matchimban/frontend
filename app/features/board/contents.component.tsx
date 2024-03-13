import Image from 'next/image';
import Link from 'next/link';

import type { RestaurantPreview } from '@/app/features/board/_types.ts';

type Props = {
	restaurants: RestaurantPreview[];
};
export default function Contents({ restaurants }: Props) {
	return restaurants.map((restaurant, idx) => (
		<li key={restaurant.id} className="sm:w-48 ">
			<Link
				href={`/restaurants/${restaurant.id}`}
				className="m-2 flex w-full space-x-3 sm:flex-col sm:space-x-0"
			>
				<div className="relative h-32 w-32 flex-initial overflow-hidden rounded-xl sm:h-48 sm:w-48">
					<Image
						src={
							'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
						}
						fill
						sizes="(max-width: 640px) 100px, 200px"
						alt="restaurant thumnail"
						className="object-cover"
						priority={idx < 6}
					/>
				</div>

				<div className="flex flex-auto justify-between">
					<div className="flex flex-col space-y-1 text-sm sm:space-y-0">
						<h2 className="text-lg">{restaurant.name}</h2>
						<span>{restaurant.category}</span>
						<span>{restaurant.addrSido}</span>
						<span>5.0</span>
					</div>

					<div className="flex-initial">
						<span>메뉴</span>
					</div>
				</div>
			</Link>
		</li>
	));
}

Contents;
