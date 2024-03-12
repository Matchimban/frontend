'use client';

import { Button, Form, Input } from 'antd';

import { register } from '@/app/features/restaurants/_server-actions.ts';
import { RestaurantField } from '@/app/features/restaurants/_types.ts';
import RegisterImages from '@/app/features/restaurants/register-image.component.tsx';

export default function RegisterForm() {
	const [form] = Form.useForm();

	const handleSubmit = async (values: any) => {
		console.log('values', values);

		const formData = new FormData();

		values?.images?.forEach((image: File | Blob, idx: number) => {
			console.log('images: ', image);
			// formData.append('images', image, `${values.name}-images-${idx}`);
			formData.append('images', `${values.name}-images-${idx}`);
		});

		delete values.images;

		const [addrSido, addrSigg, addrEmd, addrDetail] = values.address.split(' ');

		formData.append(
			'restaurant',
			JSON.stringify({
				...values,
				addrSido: addrSido,
				addrSigg: addrSigg || '',
				addrEmd: addrEmd || '',
				addrDetail: addrDetail || '',
				latitude: 0,
				longitude: 0,
			}),
		);

		console.log(
			'formData: ',
			Object.fromEntries(formData.entries()),
			formData.getAll('images'),
		);

		try {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const result = await register(formData);
		} catch (error) {
			console.log('register submit error: ', error);
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
				label="전화번호"
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
				<Button type="primary" htmlType="submit">
					등록하기
				</Button>
			</Form.Item>
		</Form>
	);
}
