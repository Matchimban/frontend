'use client';

import { Button, Dropdown, MenuProps } from 'antd';
import { useLayoutEffect } from 'react';
import { useRecoilState } from 'recoil';

import { RC_userName } from '@/app/features/authentication/_atoms.ts';
import { getCookie } from '@/app/features/authentication/_utils.ts';
import LoginButton from '@/app/features/authentication/login-button.component.tsx';
import LogoutButton from '@/app/features/authentication/logout-button.component.tsx';

const items: MenuProps['items'] = [
	{
		key: '1',
		label: <LogoutButton />,
	},
];

export default function UserButton() {
	console.log('user buottont');
	const [userName, setUserName] = useRecoilState(RC_userName);

	useLayoutEffect(() => {
		const userName = getCookie('user');
		setUserName(userName);
	}, []);

	if (!userName) return <LoginButton />;

	return (
		<Dropdown menu={{ items }}>
			<Button>{userName}</Button>
		</Dropdown>
	);
}
