'use client';

type Props = {
	userId?: number | string;
};

export default function EditButton({ userId }: Props) {
	// const { data: session } = useSession();

	return <>{userId}</>;
}
