'use client';

import { Button, Divider, Form } from 'antd';
import { useState } from 'react';

import SignInForm from '@/app/features/authentication/signin-form.component.tsx';
import SignUpForm from '@/app/features/authentication/signup-form.component.tsx';

export type Mode = 'signin' | 'signup';

export default function AuthForm() {
	const [mode, setMode] = useState<Mode>('signin');

	const onSigninMode = () => {
		setMode('signin');
	};
	const onSignupMode = () => {
		setMode('signup');
	};

	return (
		<>
			<h3 className="my-6 text-xl font-semibold">
				{mode === 'signin' && '로그인'}
				{mode === 'signup' && '회원가입'}
			</h3>
			{mode === 'signin' && <SignInForm onModeChange={onSignupMode} />}
			{mode === 'signup' && <SignUpForm onModeChange={onSigninMode} />}
			<Divider plain style={{ color: 'black' }}>
				Or
			</Divider>

			<Form>
				<Form.Item style={{ marginBottom: '14px' }}>
					<Button type="primary" htmlType="submit" className="w-full">
						GitHub
					</Button>
				</Form.Item>

				<Form.Item style={{ marginBottom: '0px' }}>
					<Button type="primary" htmlType="submit" className="w-full">
						Google
					</Button>
				</Form.Item>
			</Form>
		</>
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
