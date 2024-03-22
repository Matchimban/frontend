'use client';

import { Button, Dropdown, MenuProps } from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import LoginButton from '@/app/features/authentication/login-button.component.tsx';
import LogoutButton from '@/app/features/authentication/logout-button.component.tsx';

const items: MenuProps['items'] = [
	{
		key: '1',
		label: <LogoutButton />,
	},
	{
		key: '2',
		label: <Link href={'/restaurant/register'}>매장등록</Link>,
	},
];

export default function UserButton() {
	const { data: userSession, status } = useSession();
	// const [userName, setUserName] = useRecoilState(RC_userName);

	// useLayoutEffect(() => {
	// 	const userName = getCookie('user');
	// 	setUserName(userName);
	// }, []);
	if (status === 'loading') return null;

	if (status === 'unauthenticated') return <LoginButton />;

	return (
		<Dropdown menu={{ items }}>
			<Button>{userSession?.user?.name}</Button>
		</Dropdown>
	);
}
