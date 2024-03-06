import Image from 'next/image';
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
				<div className="w-40 flex-initial">
					<Image
						src={restaurant.images}
						width={200}
						height={100}
						alt="restaurant thumnail"
					/>
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
