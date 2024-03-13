'use server';

import { cookies } from 'next/headers';

import { baseUrl } from '@/app/constants/path.ts';

export const register = async (formdata: FormData) => {
	try {
		const token = cookies().get('accessToken');

		// 쿠키 검증
		if (!token?.value) {
			throw '로그인이 필요합니다.';
		}

		// console.log('form-data: ', formdata);

		await fetch(baseUrl + '/api/restaurants', {
			method: 'POST',
			headers: {
				// 'Content-Type': 'multipart/form-data', // body data type이 FormData이면 자동으로 명시됨.
				Authorization: `Bearer ${token.value}`,
			},
			body: formdata,
		});
		// const data: ResponseData<Restaurant> = await res.json();

		// if (!data?.result) {
		// 	throw data?.msg;
		// }

		// const { id } = data.result;
	} catch (error) {
		console.error('Register Failed! ', error);
		if (typeof error === 'string') {
			return {
				error,
			};
		}

		return {
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};
