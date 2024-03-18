'use client';

import { Button, Form, Input, Select } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { register } from '@/app/features/restaurant/_server-actions';
import type { RestaurantField } from '@/app/features/restaurant/_types';
import { compressImage } from '@/app/features/restaurant/_utils';
import RegisterImages from '@/app/features/restaurant/register-image.component';

export default function RegisterForm() {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const router = useRouter();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSubmit = async (values: any) => {
		try {
			setIsLoading(true);
			setErrorMessage('');
			const formData = new FormData();

			// 이미지 압축 후 form-data에 추가
			if (values.images) {
				const compressedImages = await Promise.all(
					values.images.map((image: File | Blob) => compressImage(image)),
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

			const { error } = await register(formData);
			if (error) {
				throw error;
			}

			router.push('/');
		} catch (error) {
			if (typeof error === 'string') {
				setErrorMessage(error);
			}

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
				rules={[{ required: true, message: '' }]}
			>
				<Input />
			</Form.Item>

			<Form.Item<RestaurantField>
				label="전화 번호"
				name="telephone"
				// style={{ marginBottom: '10px' }}
				rules={[
					{
						required: true,
						message: '',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item<RestaurantField>
				label="사업자 번호"
				name="businessNumber"
				rules={[
					{
						required: true,
						message: '',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label="주소"
				name="address"
				rules={[
					{
						required: true,
						message: '',
					},
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item<RestaurantField>
				label="분류"
				name="category"
				rules={[
					{
						required: true,
						message: '',
					},
				]}
			>
				{/* <Input /> */}
				<Select>
					<Select.Option value="KOREA">한식</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item<RestaurantField>
				label="영업 시간"
				name="businessHours"
				rules={[
					{
						required: true,
						message: '',
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item<RestaurantField>
				label="휴일"
				name="closedDays"
				rules={[
					{
						required: true,
						message: '',
					},
				]}
			>
				<Input />
			</Form.Item>
			<Form.Item<RestaurantField>
				label="소개"
				name="introduction"
				rules={[
					{
						required: true,
						message: '',
					},
				]}
			>
				<Input.TextArea
					autoSize={{
						minRows: 4,
					}}
				/>
			</Form.Item>
			<Form.Item<RestaurantField>
				label="안내 사항"
				name="notice"
				rules={[
					{
						required: true,
						message: '',
					},
				]}
			>
				<Input.TextArea
					autoSize={{
						minRows: 4,
					}}
				/>
			</Form.Item>

			<Form.Item
				label="사진"
				name="images"
				rules={[
					{
						required: true,
						message: '사진을 등록해주세요',
					},
				]}
			>
				<RegisterImages />
			</Form.Item>

			<div>
				{errorMessage && <p className="text-red-500">*{errorMessage}</p>}
			</div>

			<Form.Item>
				<div className="mb-2 mt-6">
					<Button
						type="primary"
						htmlType="submit"
						disabled={isLoading}
						className="w-full"
					>
						등록하기
					</Button>
				</div>
			</Form.Item>
		</Form>
	);
}
