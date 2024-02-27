import Link from 'next/link';

import type { NavLink } from '@/app/features/board/_types.ts';

type Props = {
	links: NavLink[];
};

export default function NavLinks({ links }: Props) {
	return links.map(link => (
		<li key={link.name}>
			<Link href={link.href}>{link.name}</Link>
		</li>
	));
}
