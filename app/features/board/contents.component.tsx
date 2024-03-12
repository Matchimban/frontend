import Image from 'next/image';
import Link from 'next/link';

import type { Restaurant } from '@/app/features/board/_types.ts';

type Props = {
	restaurants: Restaurant[];
};
export default function Contents({ restaurants }: Props) {
	return restaurants.map(restaurant => (
		<li key={restaurant.id} className="sm:w-48 ">
			<Link
				href={`/restaurants/${restaurant.id}`}
				className="m-2 flex w-full space-x-3 sm:flex-col sm:space-x-0"
			>
				<div className="relative h-32 w-32 flex-initial overflow-hidden rounded-xl sm:h-48 sm:w-48">
					<Image
						src={restaurant.images}
						fill
						sizes="(max-width: 640px) 100px, 200px"
						alt="restaurant thumnail"
						className="object-cover"
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
