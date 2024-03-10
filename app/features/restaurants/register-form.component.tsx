'use client';

import { Button, Form, Input } from 'antd';

import { RestaurantField } from '@/app/features/restaurants/_types.ts';

export default function RegisterForm() {
	const [form] = Form.useForm();

	const handleSubmit = (values: any) => {
		console.log('values', values);
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

			<Form.Item label="이미지" name="image">
				<Input />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					등록하기
				</Button>
			</Form.Item>
		</Form>
	);
}
