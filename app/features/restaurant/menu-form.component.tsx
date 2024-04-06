'use client';

import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Upload, UploadFile, UploadProps } from 'antd';
import { useState } from 'react';

type Props = {
	onSubmit: (values: any) => Promise<void>;
	onRemove: (id: number) => void;
	id: number;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function MenuForm({ onSubmit, onRemove, id }: Props) {
	const [form] = Form.useForm();
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const handleSubmit = (values: any) => {
		console.log('Received values of form:', values);
		onSubmit(values);
	};

	const handleUpload: UploadProps['onChange'] = ({ fileList }) => {
		console.log(fileList);
		// form.setFieldValue('image', fileList[0].originFileObj);
		setFileList(fileList);
	};
	return (
		<Form
			form={form}
			layout="inline"
			colon={false}
			labelCol={{ span: 7 }}
			wrapperCol={{ span: 17 }}
			autoComplete="off"
			onFinish={handleSubmit}
		>
			<div className="my-4 flex w-full items-center">
				<div>
					<Form.Item
						name="image"
						rules={[
							{
								required: true,
								message: '',
							},
						]}
						className="h-[102px] w-[102px] "
					>
						<Upload
							listType="picture-card"
							maxCount={1}
							showUploadList={{ showPreviewIcon: false }}
							beforeUpload={() => false}
							onChange={handleUpload}
							fileList={fileList}
						>
							{fileList.length <= 0 && (
								<button type="button">
									<PlusOutlined />
									<div>사진</div>
								</button>
							)}
						</Upload>
					</Form.Item>
				</div>

				<div className="flex h-full w-full flex-col justify-evenly gap-1">
					<div className="flex flex-col gap-1">
						<Form.Item
							label="메뉴 이름"
							name="name"
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
							label="메뉴 가격"
							name="price"
							rules={[
								{
									required: true,
									message: '',
								},
							]}
						>
							<Input />
						</Form.Item>
					</div>

					<div className="mx-4 flex justify-end gap-2">
						<Button
							danger
							htmlType="button"
							onClick={() => {
								onRemove(id);
							}}
						>
							취소
						</Button>
						<Button type="default" htmlType="submit">
							등록
						</Button>
					</div>
				</div>
			</div>
		</Form>
	);
}
