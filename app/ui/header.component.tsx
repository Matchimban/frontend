import dynamic from 'next/dynamic';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { NavLink } from '@/app/features/board/_types.ts';
import NavLinks from '@/app/ui/nav-links.component.tsx';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const UserButton = dynamic(
	() => import('@/app/features/authentication/user-button.componen.tsx'),
	{
		loading: () => null,
		ssr: false,
	},
);

type Props = {
	navLinks: NavLink[];
};

export default function Header({ navLinks }: Props) {
	return (
		<header className="sticky top-0 z-10 flex h-11 justify-center border-b border-stone-100 bg-[#fff] md:text-base">
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
					</ul>
				</div>

				<div className="flex flex-initial space-x-4">
					<UserButton />
					{/* <div className="flex space-x-2 ">
						<span>sign in</span>
						<span>sign up</span>
					</div> */}
				</div>
			</div>
		</header>
	);
}
