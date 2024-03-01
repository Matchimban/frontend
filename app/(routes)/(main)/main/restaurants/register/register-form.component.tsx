'use client';

import { Button, Form, Input } from 'antd';

export default function RegisterForm() {
	const [form] = Form.useForm();

	const handleSubmit = (values: any) => {
		console.log('values', values);
	};
	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={handleSubmit}
			autoComplete="off"
		>
			<Form.Item
				label="상호명"
				name="name"
				// style={{ marginBottom: '10px' }}
				rules={[{ required: true, message: '' }]}
			>
				<Input size="large" />
			</Form.Item>

			<Form.Item label="분류" name="category ">
				<Input />
			</Form.Item>

			<Form.Item
				label="전화번호"
				name="phone "
				style={{ marginBottom: '10px' }}
			>
				<Input />
			</Form.Item>

			<Form.Item label="주소" name="address ">
				<Input />
			</Form.Item>

			<Form.Item label="영업 시간" name="time ">
				<Input />
			</Form.Item>

			<Form.Item label="안내" name="notice ">
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
