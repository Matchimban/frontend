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
							width={600}
							height={400}
							// sizes="400px"
							sizes="(max-width: 640px) 100vw, 400px"
							priority
						/>
					</div>

					<div className="flex flex-col space-y-2 divide-y px-4 sm:px-0">
						<div className="flex flex-col space-y-1 ">
							<h2 className="text-xl font-semibold">{restaurant.name}</h2>
							<h4>{restaurant.category === 'KOREA' && '한식'}</h4>
						</div>

						<div className="flex flex-col space-y-2 py-2 text-xs">
							<div>
								<span>주소 : </span>

								<span>{restaurant.address.addrSido} </span>
								<span>{restaurant.address.addrSigg} </span>
								<span>{restaurant.address.addrEmd} </span>
								<span>{restaurant.address.addrDetail} </span>
							</div>

							<div>
								<span>전화 번호 : </span>
								<span>{restaurant.telephone}</span>
							</div>

							<div>
								<span>영업 시간 : </span>
								<span>{restaurant.businessHours}</span>
							</div>
						</div>

						<div className="flex flex-col space-y-2 py-2 text-xs sm:max-w-[420px]">
							<div>
								<span>소개 : </span>
								<p className="p-1 leading-5">{restaurant.introduction}</p>
							</div>
						</div>

						<div className="flex flex-col space-y-2 py-2 text-xs sm:max-w-[420px]">
							<div>
								<span>안내 : </span>
								<p className="p-1 leading-5">{restaurant.notice}</p>
							</div>
						</div>
					</div>
				</>
			)}

			{errorMessage && <p>{errorMessage}</p>}
		</>
	);
}
