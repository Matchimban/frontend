'use client';

import { Button, Checkbox, Form, Input } from 'antd';

type FieldType = {
	name: string;
	nickname: string;
	email: string;
	password: string;
	remember?: string;
};

type Props = {
	onModeChange: () => void;
};

export default function SignUpForm({ onModeChange }: Props) {
	const onFinish = (values: any) => {
		console.log('Received values of form: ', values);
	};

	const handleButtonClick = () => {
		onModeChange();
	};
	return (
		<Form name="signup" onFinish={onFinish} initialValues={{ remember: true }}>
			<Form.Item<FieldType>
				name="name"
				rules={[{ required: true, message: '이름을 입력해주세요' }]}
			>
				<Input placeholder="Name" />
			</Form.Item>
			<Form.Item<FieldType>
				name="nickname"
				rules={[{ required: true, message: '닉네임을 입력해주세요' }]}
			>
				<Input placeholder="Nick Name" />
			</Form.Item>
			<Form.Item<FieldType>
				name="email"
				rules={[{ required: true, message: '이메일을 입력해주세요' }]}
			>
				<Input placeholder="Email" />
			</Form.Item>
			<Form.Item<FieldType>
				name="password"
				rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
			>
				<Input.Password placeholder="Password" />
			</Form.Item>
			<Form.Item>
				<Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
					<Checkbox>로그인 유지하기</Checkbox>
				</Form.Item>

				<span
					className="float-right hover:cursor-pointer hover:text-blue-600"
					onClick={handleButtonClick}
				>
					로그인하기
				</span>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="w-full">
					회원가입
				</Button>
				{/* Or <a href="">register now!</a> */}
			</Form.Item>
		</Form>
	);
}