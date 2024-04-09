'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
	editRestaurant,
	postRestaurantMenu,
	postRestaurant,
	deleteRestaurant,
} from '@/app/services/restaurant.service';

export const createRestaurantAction = async (formdata: FormData) => {
	const token = cookies().get('accessToken');

	// 쿠키 검증
	if (!token?.value) {
		return {
			error: '로그인이 필요합니다.',
		};
	}

	const { error } = await postRestaurant(formdata, token.value);

	if (error) {
		return {
			error,
		};
	}

	// 주소 입력 유효성 검사 오류 있음

	revalidatePath('/'); // 홈 라우트를 dynamic rendering 전환시 삭제.
	redirect('/');
};

export const editRestaurantAction = async (
	restaurantId: string | number,
	value: Record<string, any>,
) => {
	const token = cookies().get('accessToken');

	// 쿠키 검증
	if (!token?.value) {
		return {
			error: '로그인이 필요합니다.',
		};
	}

	const { error } = await editRestaurant({
		value,
		restaurantId,
		accessToken: token.value,
	});

	if (error) {
		return {
			error,
		};
	}

	revalidatePath(`/restaurant/${restaurantId}`);
	redirect(`/restaurant/${restaurantId}`);
};

export const createMenuAction = async (
	restaurantId: number | string,
	formdata: FormData,
) => {
	const token = cookies().get('accessToken');

	// 쿠키 검증
	if (!token?.value) {
		return {
			error: '로그인이 필요합니다.',
		};
	}

	const { error } = await postRestaurantMenu({
		restaurantId,
		formdata,
		accessToken: token.value,
	});

	revalidatePath(`/restaurant/${restaurantId}`);

	return {
		error,
	};
};

export const deleteRestaurantAction = async (restaurantId: string | number) => {
	const token = cookies().get('accessToken');

	// 쿠키 검증
	if (!token?.value) {
		return {
			error: '로그인이 필요합니다.',
		};
	}

	const { error } = await deleteRestaurant({
		restaurantId,
		accessToken: token.value,
	});

	if (error) {
		return {
			error,
		};
	}

	revalidatePath(`/restaurant/${restaurantId}`);
	redirect(`/`);
};
