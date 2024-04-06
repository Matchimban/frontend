'use client';

import { Button, Form, Input, Select } from 'antd';
import { useState } from 'react';

import { type RestaurantField } from '@/app/features/restaurant/_types.ts';
import RegisterImages from '@/app/features/restaurant/register-image.component.tsx';

type Props = {
	initialValues?: Record<string, any>;
	onSubmit: (values: any) => Promise<void>;
};

export default function RegisterForm({ initialValues, onSubmit }: Props) {
	const [form] = Form.useForm();
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (values: any) => {
		try {
			setIsLoading(true);
			setErrorMessage('');

			await onSubmit(values);
		} catch (error) {
			if (typeof error === 'string') {
				setErrorMessage(error);
			}

			console.error('RegisterForm Error! ', error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Form
			form={form}
			colon={false}
			labelCol={{ span: 6 }}
			wrapperCol={{ span: 18 }}
			onFinish={handleSubmit}
			autoComplete="off"
			initialValues={initialValues}
		>
			<Form.Item<RestaurantField>
				label="상호명"
				name="name"
				// style={{ marginBottom: '10px' }}
				rules={[{ required: true, message: '' }]}
			>
				<Input disabled={!!initialValues} />
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
				<Input disabled={!!initialValues} />
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
				<Input disabled={!!initialValues} />
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
				label="분류"
				name="category"
				rules={[
					{
						required: true,
						message: '',
					},
				]}
			>
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
						required: !initialValues,
						message: '사진을 등록해주세요',
					},
				]}
			>
				<RegisterImages disabled={!!initialValues} />
			</Form.Item>

			<div>
				{errorMessage && <p className="text-red-500">*{errorMessage}</p>}
			</div>

			<div className="flex justify-end py-4">
				<Button
					type="primary"
					htmlType="submit"
					disabled={isLoading}
					className="w-full"
				>
					{!initialValues && '등록하기'}
					{initialValues && '수정하기'}
				</Button>
			</div>
		</Form>
	);
}
