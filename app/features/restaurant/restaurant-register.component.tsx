'use client';

import { createRestaurantAction } from '@/app/features/restaurant/_server-actions';
import { compressImage } from '@/app/features/restaurant/_utils';
import RegisterForm from '@/app/features/restaurant/register-form.component.tsx';
import { useGetCoordinate } from '@/app/hooks/use-geocode.hook.ts';

export default function RestaurantRegister() {
	const { getCoordinate } = useGetCoordinate();

	const handleRegister = async (values: any) => {
		const formData = new FormData();

		// 이미지 압축 후 form-data에 추가
		if (values.images) {
			const compressedImages = await Promise.all(
				values.images.map((image: File | Blob) =>
					compressImage(image, {
						maxWidth: 800,
					}),
				),
			);

			compressedImages.forEach((compressedImage, idx) => {
				formData.append(
					'images',
					compressedImage,
					`${values.name}-${idx}.${compressedImage.type.split('/')[1]}`,
				);
			});
		}

		delete values.images; // 아래에서 values를 순회하여 바로 formData를 생성하기 때문에 formData.images가 오염되지 않도록 values에서 제거.

		// 사용자 입력을 form-data에 추가
		for (const key in values) {
			formData.set(key, values[key]);
		}

		// 다른 필요한 값들은 직접 form-data에 추가
		const [addrSido, addrSigg, addrEmd, ...addrDetail] =
			values.address.split(' ');

		formData.set('originCountry', '대한민국');
		formData.set('addrSido', addrSido || '');
		formData.set('addrSigg', addrSigg || '');
		formData.set('addrEmd', addrEmd || '');
		formData.set('addrDetail', addrDetail.join(' ') || '');

		// 주소 좌표를 form-data에 추가
		try {
			const { results } = await getCoordinate(values.address);
			const { lat, lng } = results[0].geometry.location;

			formData.set('latitude', lat + '');
			formData.set('longitude', lng + '');
		} catch (error) {
			console.error('geo error: ', error);

			// 기본 좌표
			formData.set('latitude', '33.5563');
			formData.set('longitude', '126.79581');
		}

		const { error } = await createRestaurantAction(formData);
		if (error) {
			throw error;
		}
	};

	return <RegisterForm onSubmit={handleRegister} />;
}
