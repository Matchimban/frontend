'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

type Props = {
	userId: number | string;
	restaurantId: number | string;
};

export default function EditButton({ userId, restaurantId }: Props) {
	const { data: userSession } = useSession();

	if (!userSession?.user?.id) return null;

	if (userSession.user.id !== String(userId)) return null;

	// 유저 id가 일치할 떄만 수정하기 버튼 렌더링
	return (
		<Link
			href={{
				pathname: 'edit',
				query: {
					id: restaurantId,
				},
			}}
		>
			수정하기
		</Link>
	);
}
