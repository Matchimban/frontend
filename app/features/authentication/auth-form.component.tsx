import { Divider } from 'antd';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { signin } from '@/app/(routes)/(main)/main/actions/signin.action.ts';
import OAuthForm from '@/app/features/authentication/oauth-form.component.tsx';
import SignInForm from '@/app/features/authentication/signin-form.component.tsx';
import SignUpForm from '@/app/features/authentication/signup-form.component.tsx';

export type Mode = 'signin' | 'signup';

export default function AuthForm() {
	const [mode, setMode] = useState<Mode>('signin');
	const router = useRouter();

	const onSigninMode = () => {
		setMode('signin');
	};
	const onSignupMode = () => {
		setMode('signup');
	};

	const handleSubmit = async (formdata: FormData) => {
		await signin(formdata);
		router.refresh();
	};

	return (
		<>
			<h3 className="my-6 text-xl font-semibold">
				{mode === 'signin' && '로그인'}
				{mode === 'signup' && '회원가입'}
			</h3>

			{mode === 'signin' && (
				<SignInForm onModeChange={onSignupMode} onSubmit={handleSubmit} />
			)}
			{mode === 'signup' && (
				<SignUpForm onModeChange={onSigninMode} onSubmit={handleSubmit} />
			)}

			<Divider plain style={{ color: 'black' }}>
				Or
			</Divider>

			<OAuthForm />
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
