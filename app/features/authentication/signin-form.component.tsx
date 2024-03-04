import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useFormStatus } from 'react-dom';

type FieldType = {
	email: string;
	password: string;
	remember?: string;
};

type Props = {
	onModeChange: () => void;
	onSubmit: (formdata: FormData) => Promise<void>;
};

export default function SignInForm({ onModeChange, onSubmit }: Props) {
	const { pending } = useFormStatus();

	const handleButtonClick = () => {
		onModeChange();
	};

	return (
		<Form
			name="signin"
			onFinish={onSubmit}
			initialValues={{ remember: true }}
			autoComplete="off"
		>
			<Form.Item<FieldType>
				name="email"
				rules={[{ required: true, message: '이메일을 입력해주세요' }]}
			>
				<Input
					prefix={<UserOutlined className="opacity-50" />}
					placeholder="Email"
				/>
			</Form.Item>
			<Form.Item<FieldType>
				name="password"
				rules={[{ required: true, message: '비밀번호를 입력해주세요' }]}
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
				<Button
					type="primary"
					htmlType="submit"
					className="w-full"
					disabled={pending}
				>
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
