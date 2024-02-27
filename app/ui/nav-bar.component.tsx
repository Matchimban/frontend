import type { NavLink } from '@/app/features/board/_types.ts';
import NavLinks from '@/app/ui/nav-links.component.tsx';

type Props = {
	navLinks: NavLink[];
};

export default function NavBar({ navLinks }: Props) {
	return (
		<div className="sticky bottom-0 h-11 border-t border-stone-100 bg-[#fff] sm:hidden">
			<ul className="flex h-full items-center justify-around">
				<NavLinks links={navLinks} />
				{/* {navLinks.map(link => (
					<li key={link.name}>
						<Link href={link.href}>{link.name}</Link>
					</li>
				))} */}
			</ul>
		</div>
	);
}
