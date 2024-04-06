'use client';

import Link from 'next/link';
import { useRecoilValue } from 'recoil';

import { RC_user } from '@/app/features/authentication/_atoms.ts';

type Props = {
	type: 'edit' | 'menu';
	userId: number | string;
	restaurantId: number | string;
};

export default function EditButton({ userId, restaurantId, type }: Props) {
	const user = useRecoilValue(RC_user);

	if (!user?.id) return null;

	if (user.id !== String(userId)) return null;

	// 유저 id가 일치할 떄만 수정하기 버튼 렌더링
	return (
		<Link
			href={{
				pathname: type,
				query: {
					id: restaurantId,
				},
			}}
		>
			수정하기
		</Link>
	);
}
