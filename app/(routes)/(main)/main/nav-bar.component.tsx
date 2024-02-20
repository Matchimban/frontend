import Link from 'next/link';

import { NavLink } from '@/app/(routes)/(main)/main/_types.ts';

type Props = {
	items: NavLink[];
};

export default function NavBar({ items }: Props) {
	return (
		<footer className="sticky bottom-0 h-11 border-t border-stone-100 bg-[#fff] sm:hidden">
			<ul className="flex h-full items-center justify-around">
				{items.map(item => (
					<li key={item.name}>
						<Link href={item.href}>{item.name}</Link>
					</li>
				))}
			</ul>
		</footer>
	);
}
