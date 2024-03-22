import { baseUrl } from '@/app/constants/path.ts';
import type {
	RegisterResponse,
	RestaurantPreview,
} from '@/app/features/restaurant/_types.ts';
import type { Restaurant } from '@/app/features/restaurant/_types.ts';
import type { ResponseData } from '@/app/types/index.ts';

export const getRestaurantPreviews = async () => {
	try {
		const res = await fetch(baseUrl + '/api' + '/restaurants');
		const data: ResponseData<RestaurantPreview[]> = await res.json();

		if (!data.result && data.msg) {
			throw data.msg;
		}

		const { result: restaurants } = data;

		return {
			data: restaurants,
			error: null,
		};
	} catch (error) {
		if (typeof error === 'string') {
			return {
				data: null,
				error,
			};
		}

		console.error('getRestaurantPreviews: ', error);
		throw error;
	}
};

export const getRestaurant = async (id: number | string) => {
	try {
		const res = await fetch(baseUrl + '/api' + '/restaurants' + `/${id}`);
		const data: ResponseData<Restaurant> = await res.json();

		if (!data.result && data.msg) {
			throw data.msg;
		}

		const { result: restaurants } = data;

		return {
			data: restaurants,
			error: null,
		};
	} catch (error) {
		if (typeof error === 'string') {
			return {
				data: null,
				error,
			};
		}

		console.error('getRestaurant: ', error);
		return {
			data: null,
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};

export const postRestaurant = async (
	formdata: FormData,
	accessToken: string,
) => {
	try {
		const res = await fetch(baseUrl + '/api' + '/restaurants', {
			method: 'POST',
			headers: {
				// 'Content-Type': 'multipart/form-data'
				// body data type이 FormData이면 이 헤더가 자동으로 명시됨.
				Authorization: `Bearer ${accessToken}`,
			},
			body: formdata,
		});
		const data: ResponseData<RegisterResponse[] | null> = await res.json();

		if (data.result) {
			throw data.result[0].msg;
		}

		return {
			data: null,
			error: null,
		};
	} catch (error) {
		if (typeof error === 'string') {
			return {
				data: null,
				error,
			};
		}

		console.error('postRestaurant: ', error);
		return {
			data: null,
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};

export const patchRestaurant = async ({
	value,
	accessToken,
	restaurantId,
}: {
	value: any;
	accessToken: string;
	restaurantId: string | number;
}) => {
	try {
		const res = await fetch(
			baseUrl + '/api' + '/restaurants' + `/${restaurantId}`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(value),
			},
		);
		const data: ResponseData<RegisterResponse[] | null> = await res.json();

		if (data.msg) {
			throw data.msg;
		}

		return {
			data: null,
			error: null,
		};
	} catch (error) {
		if (typeof error === 'string') {
			return {
				data: null,
				error,
			};
		}

		console.error('postRestaurant: ', error);
		return {
			data: null,
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};
