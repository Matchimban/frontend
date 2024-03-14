import Link from 'next/link';

import { NavLink } from '@/app/types/index.ts';

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
