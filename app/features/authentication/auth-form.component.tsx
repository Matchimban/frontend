import { Alert } from 'antd';
import { Mode } from 'fs';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { signin } from '@/app/features/authentication/_actions.ts';
import { RC_userName } from '@/app/features/authentication/_atoms.ts';
import { getCookie } from '@/app/features/authentication/_utils.ts';
import SignInForm from '@/app/features/authentication/signin-form.component.tsx';
import SignUpForm from '@/app/features/authentication/signup-form.component.tsx';

export default function AuthForm() {
	const setUserName = useSetRecoilState(RC_userName);
	const [mode, setMode] = useState<Mode>('signin');
	const [errorMessage, setErrorMessage] = useState('');

	const handleModeChange = (mode: Mode) => {
		setMode(mode);
		setErrorMessage('');
	};

	const handleSubmit = async (formdata: FormData) => {
		const { error } = await signin(formdata);

		if (error) {
			setErrorMessage(error);
			return;
		}

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
				<div>
					{errorMessage && (
						<Alert
							type="warning"
							message={errorMessage}
							showIcon
							closable
							afterClose={() => {
								setErrorMessage('');
							}}
						/>
					)}
				</div>
			</div>

			{mode === 'signin' && (
				<SignInForm onModeChange={handleModeChange} onSubmit={handleSubmit} />
			)}
			{mode === 'signup' && (
				<SignUpForm onModeChange={handleModeChange} onSubmit={handleSubmit} />
			)}

			{/* <Divider plain style={{ color: 'black' }}>
				Or
			</Divider>

			<OAuthForm /> */}
		</>
	);
}
