import { NavLink } from '@/app/(routes)/(main)/main/_types.ts';
import NavLinks from '@/app/(routes)/(main)/main/nav-links.component.tsx';

const Layout = ({ children }: { children: React.ReactNode }) => {
	const navLinks: NavLink[] = [
		{ name: '아이템1', href: '/', icon: 'icon' },
		{ name: '아이템2', href: '/', icon: 'icon' },
		{ name: '아이템3', href: '/', icon: 'icon' },
		{ name: '아이템4', href: '/', icon: 'icon' },
	];

	return (
		<div className="text-sm md:text-base">
			<header className="sticky top-0 flex h-11 justify-center border-b border-stone-100 bg-[#fff] ">
				<div className="flex h-full w-full max-w-[1024px] items-center justify-between space-x-4 px-4">
					<div className="flex flex-initial space-x-2">
						<h1>logo</h1>
						<span className="hidden lg:block">맛침반</span>
					</div>

					<div className="flex max-w-[640px] flex-auto justify-center space-x-4">
						<div className="flex-auto">
							<div className="flex h-8 max-w-[320px] items-center rounded-full bg-stone-400">
								<span>search</span>
							</div>
						</div>

						<ul className="hidden sm:flex sm:flex-initial sm:items-center sm:justify-center sm:space-x-4">
							<NavLinks links={navLinks} />
							{/* <span>지도 보기</span>
							<span>맛집 목록</span>
							<span>예약 조회</span> */}
						</ul>
					</div>

					<div className="flex flex-initial space-x-4">
						<div className="flex space-x-2 ">
							<span>sign in</span>
							<span>sign up</span>
						</div>
					</div>
				</div>
			</header>

			<main>{children}</main>

			<footer className="sticky bottom-0 h-11 border-t border-stone-100 bg-[#fff] sm:hidden">
				<ul className="flex h-full items-center justify-around">
					<NavLinks links={navLinks} />
				</ul>
			</footer>
		</div>
	);
};

export default Layout;
