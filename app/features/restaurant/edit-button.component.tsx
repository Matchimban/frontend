'use client';

import Link from 'next/link';
import { useRecoilValue } from 'recoil';

import { RC_user } from '@/app/features/authentication/_atoms.ts';
import { deleteRestaurantAction } from '@/app/features/restaurant/_server-actions.ts';

type Props = {
	type: 'edit' | 'menu' | 'remove';
	userId: number | string;
	restaurantId: number | string;
};

export default function EditButton({ userId, restaurantId, type }: Props) {
	const user = useRecoilValue(RC_user);

	const handleRemove = async () => {
		await deleteRestaurantAction(restaurantId);
	};

	if (!user?.id) return null;

	if (user.id !== String(userId)) return null;

	if (type === 'remove')
		return <button onClick={handleRemove}>삭제하기</button>;

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
