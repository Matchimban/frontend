'use client';

import { SelectOutlined } from '@ant-design/icons';
import { Modal, Spin } from 'antd';
import { useState } from 'react';
import { Map, MapMarker, useKakaoLoader } from 'react-kakao-maps-sdk';

import { KAKAO_MAPS_API_KEY } from '@/app/constants/keys.ts';

type Prop = {
	type?: 'default' | 'modal';
	lat: number;
	lng: number;
};

export default function RestaurantDetailMap({
	type = 'default',
	lat,
	lng,
}: Prop) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [loading] = useKakaoLoader({
		appkey: KAKAO_MAPS_API_KEY || '',
	});

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	// if (loading)
	// 	return (
	// 		<div className="flex h-full w-full items-center justify-center bg-slate-50 text-center">
	// 			<Spin />
	// 		</div>
	// 	);

	if (type === 'default')
		return (
			<>
				{loading && (
					<div className="flex h-full w-full items-center justify-center bg-slate-50 text-center">
						<Spin />
					</div>
				)}
				<Map id="map" center={{ lat, lng }} level={2} className="h-full w-full">
					<MapMarker position={{ lat, lng }}></MapMarker>
				</Map>
			</>
		);

	if (type === 'modal')
		return (
			<>
				<div
					className="px-2 text-xs hover:cursor-pointer sm:hidden"
					onClick={handleOpenModal}
				>
					<SelectOutlined /> <span>지도 보기</span>
				</div>

				{isModalOpen && (
					<Modal
						open={isModalOpen}
						onCancel={handleCloseModal}
						width={'80vw'}
						footer={[]}
					>
						<div className="h-[50vh] w-full pt-5">
							{loading && (
								<div className="flex h-full w-full items-center justify-center bg-slate-50 text-center">
									<Spin />
								</div>
							)}

							<Map
								id="map"
								center={{ lat, lng }}
								level={2}
								className="h-full w-full"
							>
								<MapMarker position={{ lat, lng }}></MapMarker>
							</Map>
						</div>
					</Modal>
				)}
			</>
		);
}
