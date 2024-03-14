import Image from 'next/image';

import { Restaurant } from '@/app/features/restaurant/_types.ts';

type Prop = {
	restaurant: Restaurant | null;
	errorMessage: string | null;
};
export default function RestaurantDetail({ restaurant, errorMessage }: Prop) {
	return (
		<section className="flex flex-col space-y-4">
			{restaurant && (
				<>
					<div className="relative h-[40vh] w-screen overflow-hidden sm:max-w-[420px]">
						<Image
							src={
								'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D'
							}
							alt="restaurant image"
							fill
							sizes="(max-width: 400px) 100vw, 400px"
							className="object-cover"
						/>
					</div>

					<div className="flex flex-col space-y-1 px-4 sm:px-0">
						<h2 className="text-xl font-semibold">{restaurant.name}</h2>
						<h4>{restaurant.category}</h4>
						<h4>{restaurant.address.addrSido}</h4>
					</div>
				</>
			)}

			{errorMessage && <p>{errorMessage}</p>}
		</section>
	);
}
