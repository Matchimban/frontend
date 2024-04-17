import {
	ClockCircleOutlined,
	HomeOutlined,
	InfoCircleOutlined,
	PhoneOutlined,
	QuestionCircleOutlined,
} from '@ant-design/icons';

import type { Restaurant } from '@/app/features/restaurant/_types.ts';
import RestaurantDetailMap from '@/app/features/restaurant/restaurant-detail-map.component.tsx';
import RestaurantDetailSlick from '@/app/features/restaurant/restaurant-detail-slick.component.tsx.tsx';

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
					<RestaurantDetailSlick images={restaurant.images} />

					<div className="flex flex-col space-y-2 divide-y px-4 sm:px-0">
						<div className="flex flex-col space-y-1 ">
							<h2 className="text-xl font-semibold">{restaurant.name}</h2>
							<h4>{restaurant.category === 'KOREA' && '한식'}</h4>
						</div>

						<div className="flex flex-col space-y-2 py-2 text-sm">
							<div className="flex justify-between">
								<div>
									<HomeOutlined /> <span>주소 : </span>
									<span>{restaurant.address.addrSido} </span>
									<span>{restaurant.address.addrSigg} </span>
									<span>{restaurant.address.addrEmd} </span>
									<span>{restaurant.address.addrDetail} </span>
								</div>

								<RestaurantDetailMap
									lat={restaurant.address.latitude || 33.5563}
									lng={restaurant.address.longitude || 126.79581}
									type="modal"
								/>
							</div>

							<div>
								<PhoneOutlined /> <span>전화 번호 : </span>
								<span>{restaurant.telephone}</span>
							</div>

							<div>
								<ClockCircleOutlined /> <span>영업 시간 : </span>
								<span>{restaurant.businessHours}</span>
							</div>
						</div>

						<div className="flex flex-col space-y-2 py-2 text-sm sm:max-w-[420px]">
							<div>
								<InfoCircleOutlined /> <span>소개 : </span>
								<p className="p-1 leading-5">{restaurant.introduction}</p>
							</div>
						</div>

						<div className="flex flex-col space-y-2 py-2 text-sm sm:max-w-[420px]">
							<div>
								<QuestionCircleOutlined /> <span>안내 : </span>
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
