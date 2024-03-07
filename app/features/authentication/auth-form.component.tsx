import { Divider } from 'antd';
// import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { signin } from '@/app/(routes)/(main)/main/actions/signin.action.ts';
import { RC_userName } from '@/app/features/authentication/_atoms.ts';
import { getCookie } from '@/app/features/authentication/_utils.ts';
import OAuthForm from '@/app/features/authentication/oauth-form.component.tsx';
import SignInForm from '@/app/features/authentication/signin-form.component.tsx';
import SignUpForm from '@/app/features/authentication/signup-form.component.tsx';

export type Mode = 'signin' | 'signup';

// const authenticate = async (
// 	prevState: string | undefined,
// 	formData: FormData,
// ) => await signin(formData);

export default function AuthForm() {
	const [mode, setMode] = useState<Mode>('signin');
	const setUserName = useSetRecoilState(RC_userName);
	// const router = useRouter();

	const onSigninMode = () => {
		setMode('signin');
	};
	const onSignupMode = () => {
		setMode('signup');
	};

	const handleSubmit = async (formdata: FormData) => {
		await signin(formdata);
		const userName = getCookie('user');
		setUserName(userName);
	};

	return (
		<>
			<div className="my-6 flex flex-col space-y-2">
				<h3 className=" text-xl font-semibold">
					{mode === 'signin' && '로그인'}
					{mode === 'signup' && '회원가입'}
				</h3>
				{/* <div>
					{state && <Alert type="warning" message={state} showIcon closable />}
				</div> */}
			</div>

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
