import dynamic from 'next/dynamic';
import Link from 'next/link';

import type { NavLink } from '@/app/types/index.ts';
import Logo from '@/app/ui/logo.component.tsx';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Header({ navLinks }: Props) {
	return (
		<header className="sticky top-0 z-10 flex h-12 justify-center border-b border-stone-200 bg-[#fff] md:text-base">
			<div className="flex h-full w-full max-w-[1024px] items-center justify-between space-x-4 px-4">
				<Link
					href={'/'}
					className="flex flex-initial items-center sm:space-x-1"
				>
					<div className="w-10 sm:w-11">
						<Logo />
					</div>

					<div>
						{/* <span className="hidden tracking-widest sm:block">맛침반</span> */}
						<span className="tracking-widest">맛침반</span>
					</div>
				</Link>

				<div className="flex max-w-[640px] flex-auto justify-center space-x-4">
					<div className="flex-auto">
						{/* <div className="flex h-8 max-w-[320px] items-center rounded-full bg-stone-400">
							<span>search</span>
						</div> */}
					</div>

					<ul className="hidden sm:flex sm:flex-initial sm:items-center sm:justify-center sm:space-x-4">
						{/* <NavLinks links={navLinks} /> */}
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
