import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import type { Mode } from '@/app/features/authentication/_types.ts';

type FieldType = {
	email: string;
	password: string;
	remember?: string;
};

type Props = {
	onModeChange: (mode: Mode) => void;
	onSubmit: (formdata: FormData) => Promise<void>;
	disabled?: boolean;
};

export default function SignInForm({
	onModeChange,
	onSubmit,
	disabled,
}: Props) {
	const handleButtonClick = () => {
		onModeChange('signup');
	};

	return (
		<Form
			name="signin"
			onFinish={onSubmit}
			initialValues={{ remember: true }}
			autoComplete="off"
			disabled={disabled}
		>
			<Form.Item<FieldType>
				name="email"
				rules={[
					{
						required: true,
						message: '이메일을 입력해주세요',
					},
					{ type: 'email', message: '올바른 이메일 형식이 아닙니다.' },
				]}
			>
				<Input
					prefix={<UserOutlined className="opacity-50" />}
					placeholder="Email"
				/>
			</Form.Item>
			<Form.Item<FieldType>
				name="password"
				rules={[
					{ required: true, message: '비밀번호를 입력해주세요' },
					{ min: 4, message: '4자리 이상 입력해주세요.' },
				]}
			>
				<Input.Password
					prefix={<LockOutlined className="opacity-50" />}
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item>
				<Form.Item<FieldType> name="remember" valuePropName="checked" noStyle>
					<Checkbox>로그인 유지하기</Checkbox>
				</Form.Item>

				<span
					className="float-right hover:cursor-pointer hover:text-blue-600"
					onClick={handleButtonClick}
				>
					회원가입하기
				</span>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="w-full">
					로그인
				</Button>
				{/* Or <a href="">register now!</a> */}
			</Form.Item>
		</Form>
	);
}

/*
		<Form
			name="sign"
			layout="horizontal"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			size="small">
			<Form.Item<FieldType>
				label="Email"
				name="email"
				style={{ marginBottom: '10px' }}
				colon={false}>
				<Input />
			</Form.Item>

			<Form.Item<FieldType>
				label="Password"
				name="password"
				style={{ marginBottom: '10px' }}
				colon={false}>
				<Input />
			</Form.Item>
      
		</Form>
*/
