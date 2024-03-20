'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { postRestaurant } from '@/app/services/restaurant.service';

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

	return {
		error: null,
	};
};
