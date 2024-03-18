import Image from 'next/image';

import type { Restaurant } from '@/app/features/restaurant/_types.ts';

type Prop = {
	restaurant: Restaurant | null;
	errorMessage: string | null;
};
export default function RestaurantDetail({ restaurant, errorMessage }: Prop) {
	return (
		<>
			{restaurant && (
				<>
					{/* <div className="relative h-[40vh] w-screen overflow-hidden sm:max-w-[420px]">
						<Image
							src={
								'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D'
							}
							alt="restaurant image"
							fill
							sizes="(max-width: 400px) 100vw, 400px"
							className="object-cover"
						/>
					</div> */}

					<div className="sm:max-w-[420px]">
						<Image
							src={
								'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8fDA%3D'
							}
							alt="restaurant image"
							width={700}
							height={500}
							sizes="400px"
						/>
					</div>

					<div className="flex flex-col space-y-2 divide-y px-4 sm:px-0">
						<div className="flex flex-col space-y-1 ">
							<h2 className="text-xl font-semibold">{restaurant.name}</h2>
							<h4>한식</h4>
							<h4>{restaurant.address.addrSido}</h4>
						</div>

						<div className="flex flex-col space-y-2 py-2 text-xs">
							<div>
								<span>주소 : </span>

								<span>{restaurant.address.addrSido} </span>
								<span>{restaurant.address.addrSigg} </span>
								<span>{restaurant.address.addrEmd} </span>
								<span>{restaurant.address.addrDetail} </span>
							</div>
							{/* <div>
							<span>카테고리 : </span>
							<span>{restaurant.category}</span>
						</div> */}
							<div>
								<span>전화번호 : </span>
								<span>{restaurant.telephone}</span>
							</div>
							<div>
								<span>소개 : </span>
								<p>{restaurant.introduction}</p>
							</div>
							<div>
								<span>안내 : </span>
								<p>{restaurant.notice}</p>
							</div>
							{/* <div>
							<span>영업 시간 : </span>
							<span>{restaurant.businessHours}</span>
						</div> */}
						</div>
					</div>
				</>
			)}

			{errorMessage && <p>{errorMessage}</p>}
		</>
	);
}
