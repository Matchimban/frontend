'use client';

import { Button, Form, Input } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { register } from '@/app/features/restaurants/_server-actions.ts';
import { RestaurantField } from '@/app/features/restaurants/_types.ts';
import { compressImage } from '@/app/features/restaurants/_utils.ts';
import RegisterImages from '@/app/features/restaurants/register-image.component.tsx';

export default function RegisterForm() {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const handleSubmit = async (values: any) => {
		router.push('/');
		return;
		try {
			setIsLoading(true);
			const formData = new FormData();

			// 이미지 압축 후 form-data에 추가
			if (values.images) {
				const compressedImages = await Promise.all(
					values.images.map((image: File | Blob) =>
						compressImage(image, {
							quality: 0.5,
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
			const [addrSido, addrSigg, addrEmd, addrDetail] =
				values.address.split(' ');

			formData.set('originCountry', '대한민국');
			formData.set('addrSido', addrSido || '');
			formData.set('addrSigg', addrSigg || '');
			formData.set('addrEmd', addrEmd || '');
			formData.set('addrDetail', addrDetail || '');

			formData.set('latitude', '0');
			formData.set('longitude', '0');

			await register(formData);
		} catch (error) {
			console.error('Register Failed! ', error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Form
			form={form}
			colon={false}
			labelCol={{ span: 4 }}
			wrapperCol={{ span: 20 }}
			onFinish={handleSubmit}
			autoComplete="off"
		>
			<Form.Item<RestaurantField>
				label="상호명"
				name="name"
				// style={{ marginBottom: '10px' }}
				// rules={[{ required: true, message: '' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item<RestaurantField>
				label="전화 번호"
				name="telephone"
				// style={{ marginBottom: '10px' }}
			>
				<Input />
			</Form.Item>

			<Form.Item<RestaurantField> label="사업자 번호" name="businessNumber">
				<Input />
			</Form.Item>

			<Form.Item label="주소" name="address">
				<Input />
			</Form.Item>

			<Form.Item<RestaurantField> label="카테고리" name="category">
				<Input />
			</Form.Item>

			<Form.Item<RestaurantField> label="영업 시간" name="businessHours">
				<Input />
			</Form.Item>
			<Form.Item<RestaurantField> label="휴일" name="closedDays">
				<Input />
			</Form.Item>
			<Form.Item<RestaurantField> label="소개" name="introduction">
				<Input.TextArea
					autoSize={{
						minRows: 4,
					}}
				/>
			</Form.Item>
			<Form.Item<RestaurantField> label="안내 사항" name="notice">
				<Input.TextArea
					autoSize={{
						minRows: 4,
					}}
				/>
			</Form.Item>

			<Form.Item label="사진" name="images">
				<RegisterImages />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" disabled={isLoading}>
					등록하기
				</Button>
			</Form.Item>
		</Form>
	);
}
