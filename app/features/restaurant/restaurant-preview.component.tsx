import Image from 'next/image';
import Link from 'next/link';

import {
	MenuCategory,
	type RestaurantPreview,
} from '@/app/features/restaurant/_types.ts';

type Props = {
	restaurantPreviews: RestaurantPreview[] | null | undefined;
	errorMessage: string | null;
};
export default function RestaurantPreviews({
	restaurantPreviews,
	errorMessage,
}: Props) {
	return (
		<>
			<ul className="flex flex-col divide-y p-2 sm:grid sm:grid-cols-3 sm:justify-center">
				{restaurantPreviews &&
					restaurantPreviews.map((restaurant, idx) => (
						<li key={restaurant.id} className="sm:w-48">
							<Link
								href={`/restaurant/${restaurant.id}`}
								prefetch={false}
								className="m-2 flex w-full space-x-3  sm:flex-col sm:space-x-0">
								<div className="relative h-32 w-32 flex-initial overflow-hidden rounded-xl sm:h-48 sm:w-48">
									<Image
										src={restaurant.imageUrl}
										fill
										sizes="(max-width: 640px) 100px, 200px"
										alt="restaurant thumnail"
										className="object-cover"
										priority={!!restaurant.imageUrl && idx < 6}
									/>
								</div>

								<div className="flex flex-auto justify-between">
									<div className="flex flex-col space-y-1 py-1 text-sm sm:space-y-0 sm:px-1 sm:py-0">
										<h2 className="text-lg">{restaurant.name}</h2>
										<span className="text-xs">
											{MenuCategory[restaurant.category]}
										</span>

										<span className="text-xs">{restaurant.addrSido}</span>

										{/* <span>{restaurant.addrSido}</span> */}
										{/* <span>5.0</span> */}
									</div>

									<div className="flex-initial">{/* <span>메뉴</span> */}</div>
								</div>
							</Link>
						</li>
					))}

				{errorMessage && <p>{errorMessage}</p>}
			</ul>
		</>
	);
}

// 						'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D'
