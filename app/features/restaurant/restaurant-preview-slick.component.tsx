'use client';

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';
import { CarouselRef } from 'antd/es/carousel/index';
import clsx from 'clsx/lite';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useCallback, useRef, useState } from 'react';

import {
	MenuCategory,
	type RestaurantPreview,
} from '@/app/features/restaurant/_types.ts';

type Props = {
	restaurantPreviews: RestaurantPreview[];
};

export default function RestaurantPreviewSlick({ restaurantPreviews }: Props) {
	const ref = useRef<CarouselRef>(null);
	const [current, setCurrent] = useState(1);

	const slides = 4;
	const isSlideOn = restaurantPreviews.length + 1 > slides;
	const isFirstSlideShowed = current === 1;
	const isLastSlideShowed = current === restaurantPreviews.length + 1 - slides;

	const handlePrev = useCallback(() => {
		ref.current?.prev();
	}, [ref]);
	const handleNext = useCallback(() => {
		ref.current?.next();
	}, [ref]);

	const handleCurrent = useCallback((cur: number) => {
		// if (isLastSlideShowed) return;

		setCurrent(cur + 1);
	}, []);

	return (
		<div className="relative">
			<ul>
				<Carousel
					ref={ref}
					draggable
					dots={false}
					infinite={false}
					slidesToShow={slides}
					slidesToScroll={slides}
					// centerMode
					// centerPadding="60px"
					// initialSlide={2}
					afterChange={handleCurrent}
					className="px-2 py-4"
					// responsive={[
					// 	{
					// 		breakpoint: 640,
					// 		settings: {
					// 			slidesToShow: slides - 1,
					// 			slidesToScroll: slides - 1,
					// 			draggable: true,
					// 			swipeToSlide: true,
					// 			dots: true,
					// 			afterChange: cur => console.log('afte: ', cur),
					// 			beforeChange: cur => console.log('befo: ', cur),
					// 		},
					// 	},
					// ]}
				>
					{restaurantPreviews?.map((restaurant, idx) => (
						<li key={restaurant.id} className="flex justify-center">
							<Link
								href={`/restaurant/${restaurant.id}`}
								prefetch={false}
								className="flex flex-col items-center "
							>
								<div className="relative h-28 w-28 flex-initial overflow-hidden rounded-xl sm:h-36 sm:w-36 md:h-40 md:w-40">
									<Image
										src={restaurant.imageUrl}
										fill
										sizes="(max-width: 640px) 100px, 200px"
										alt="restaurant thumnail"
										className="object-cover"
										priority={!!restaurant.imageUrl && idx < 6}
									/>
								</div>

								<div className="flex w-28 flex-auto justify-between sm:w-36 md:w-40">
									<div className="flex flex-col px-1 py-1 text-sm text-black md:py-0">
										<h2 className="text-md sm:text-lg">{restaurant.name}</h2>
										<div className="text-xs text-gray-600">
											<span>{MenuCategory[restaurant.category]}</span>{' '}
											{/* <span> | </span> */}
											<span>({restaurant.addrSido})</span>
										</div>

										{/* <span>{restaurant.addrSido}</span> */}
										{/* <span>5.0</span> */}
									</div>

									<div className="flex-initial">{/* <span>메뉴</span> */}</div>
								</div>
							</Link>
						</li>
					))}
				</Carousel>
			</ul>
			{restaurantPreviews?.length > 1 && (
				<>
					{isSlideOn && !isFirstSlideShowed && (
						<SlideButton className="left-2">
							<LeftOutlined
								className="hover:cursor-pointer"
								onClick={handlePrev}
							/>
						</SlideButton>
					)}

					{isSlideOn && !isLastSlideShowed && (
						<SlideButton className="right-2">
							<RightOutlined
								className="hover:cursor-pointer"
								onClick={handleNext}
							/>
						</SlideButton>
					)}
				</>
			)}
		</div>
	);
}

function SlideButton({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={clsx(
				'absolute top-[40%]  flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black bg-opacity-60 text-2xl text-white',
				className,
			)}
		>
			{children}
		</div>
	);
}
