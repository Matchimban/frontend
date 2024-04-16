'use client';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel/index';
import Image from 'next/image';
import { Fragment, useCallback, useRef, useState } from 'react';

import type { Images } from '@/app/features/restaurant/_types.ts';
import noImage from '@/public/no-image.jpeg';

type Prop = {
	images: Images[];
};

export default function RestaurantDetailSlick({ images }: Prop) {
	const ref = useRef<CarouselRef>(null);
	const [current, setCurrent] = useState(1);

	const handlePrev = useCallback(() => {
		ref.current?.prev();
	}, [ref]);
	const handleNext = useCallback(() => {
		ref.current?.next();
	}, [ref]);

	const handleCurrent = useCallback((cur: number) => {
		setCurrent(cur + 1);
	}, []);

	return (
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
			{/* <div className="relative h-[65vw] w-screen overflow-hidden sm:h-[280px] sm:max-w-[420px]"> */}
			<div className="relative w-screen sm:max-w-[420px]">
				<Carousel
					ref={ref}
					draggable
					dots={false}
					infinite={false}
					afterChange={handleCurrent}
					beforeChange={handleCurrent}
				>
					{images.map((image, idx) => (
						<div
							key={image.id}
							className="relative h-[65vw] w-screen overflow-hidden sm:h-[280px] sm:max-w-[420px]"
						>
							<Image
								src={image.savedFileUrl || noImage}
								alt="restaurant image"
								fill
								// width={600}
								// height={400}
								sizes="(max-width: 640px) 100vw, 400px"
								priority={idx === 0}
								className="object-cover"
							/>
						</div>
					))}
				</Carousel>

				{images.length > 1 && (
					<>
						<div className="absolute left-2 top-[40%] w-[40px] text-3xl text-white">
							<LeftOutlined
								className="hover:cursor-pointer"
								onClick={handlePrev}
							/>
						</div>
						<div className="absolute right-2 top-[40%] w-[40px] text-3xl text-white">
							<RightOutlined
								className="hover:cursor-pointer"
								onClick={handleNext}
							/>
						</div>
						<div className="absolute bottom-2 right-2 rounded-xl bg-gray-300 bg-opacity-70 px-4 text-white hover:cursor-default">
							{current} / {images.length}
						</div>
					</>
				)}
			</div>
		</>
	);
}
