'use client';

import { useSession } from 'next-auth/react';

type Props = {
	userId?: number | string;
};

export default function EditButton({ userId }: Props) {
	const { data: session } = useSession();
	console.log('sesssoin: ', session);

	return <>{userId}</>;
}
