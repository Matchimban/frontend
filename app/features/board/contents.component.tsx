import Link from 'next/link';

import type { Restaurant } from '@/app/features/board/_types.ts';

type Props = {
	restaurants: Restaurant[];
};
export default function Contents({ restaurants }: Props) {
	return restaurants.map(restaurant => (
		<li key={restaurant.id}>
			<Link
				href={`/main/restaurants/${restaurant.id}`}
				className="flex w-full space-x-4 p-2"
			>
				<div className="flex-initial">
					<figure className="h-32 w-28 bg-stone-300">
						{/* <span>image</span> */}
						<img src={restaurant.images} />
					</figure>
				</div>
				<div className="flex flex-auto justify-between">
					<div className="flex flex-col">
						<h1>{restaurant.category}</h1>
						<span>{restaurant.name}</span>
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
