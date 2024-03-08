import { NavLink } from '@/app/features/board/_types';
import Header from '@/app/ui/header.component.tsx';
import NavBar from '@/app/ui/nav-bar.component.tsx';

const Layout = ({ children }: { children: React.ReactNode }) => {
	const navLinks: NavLink[] = [
		{ name: '아이템1', href: '/', icon: 'icon' },
		{ name: '아이템2', href: '/', icon: 'icon' },
		{ name: '아이템3', href: '/', icon: 'icon' },
		{ name: '아이템4', href: '/', icon: 'icon' },
	];

	return (
		<div className="text-sm">
			<Header navLinks={navLinks} />

			<main className="flex justify-center bg-blue-200">{children}</main>

			<NavBar navLinks={navLinks} />
		</div>
	);
};

export default Layout;
