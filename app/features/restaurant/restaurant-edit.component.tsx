'use client';

import { useMemo } from 'react';

import { editRestaurantAction } from '@/app/features/restaurant/_server-actions.ts';
import { Restaurant } from '@/app/features/restaurant/_types.ts';
import RegisterForm from '@/app/features/restaurant/register-form.component.tsx';

type Props = {
	restaurant: Restaurant;
};

export default function RestaurantEdit({ restaurant }: Props) {
	const initialValues = useMemo(
		() => ({
			...restaurant,
			address: `${restaurant.address.addrSido} ${restaurant.address.addrSigg} ${restaurant.address.addrEmd} ${restaurant.address.addrDetail}`,
		}),
		[],
	);

	const handleEdit = async (values: any) => {
		const newValues = { ...restaurant, ...restaurant.address, ...values };

		const { error } = await editRestaurantAction(restaurant.id, newValues);

		if (error) {
			throw error;
		}
	};

	return <RegisterForm onSubmit={handleEdit} initialValues={initialValues} />;
}
