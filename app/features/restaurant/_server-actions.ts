'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
	patchRestaurant,
	postMenu,
	postRestaurant,
} from '@/app/services/restaurant.service';

export const register = async (formdata: FormData) => {
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

export const edit = async (
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

	const { error } = await patchRestaurant({
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

export const createMenu = async (id: number | string, formdata: FormData) => {
	const token = cookies().get('accessToken');

	// 쿠키 검증
	if (!token?.value) {
		return {
			error: '로그인이 필요합니다.',
		};
	}

	const { error } = await postMenu({ id, formdata, accessToken: token.value });

	// 주소 입력 유효성 검사 오류 있음

	revalidatePath(`/restaurant/${id}`);
	// redirect(`/restaurant/${id}`);

	return {
		error,
	};
};
