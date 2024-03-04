import { Button, Dropdown, MenuProps } from 'antd';

import LoginButton from '@/app/features/authentication/login-button.component.tsx';
import LogoutButton from '@/app/features/authentication/logout-button.component.tsx';
import { auth } from '@/auth.ts';

const items: MenuProps['items'] = [
	{
		key: '1',
		label: <LogoutButton />,
	},
];

export default async function UserButton() {
	const session = await auth();

	if (!session?.user) return <LoginButton />;

	return (
		<Dropdown menu={{ items }}>
			<Button>User</Button>
		</Dropdown>
	);
}
