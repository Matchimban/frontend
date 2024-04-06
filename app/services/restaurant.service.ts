import { baseUrl } from '@/app/constants/path.ts';
import type {
	RegisterResponse,
	RestaurantMenu,
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

export const getRestaurant = async (restaurantId: number | string) => {
	try {
		const res = await fetch(
			baseUrl + '/api' + '/restaurants' + `/${restaurantId}`,
		);
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

// menu api

export const getRestaurantMenus = async (restaurantId: number | string) => {
	try {
		const res = await fetch(
			baseUrl + '/api' + `/restaurants/${restaurantId}/menus`,
		);
		const data: ResponseData<RestaurantMenu[]> = await res.json();

		if (!data.result && data.msg) {
			throw data.msg;
		}

		const { result: restaurantMenus } = data;

		return {
			data: restaurantMenus,
			error: null,
		};
	} catch (error) {
		if (typeof error === 'string') {
			return {
				data: null,
				error,
			};
		}

		console.error('getRestaurantMenus: ', error);
		return {
			data: null,
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};

export const postRestaurantMenu = async ({
	formdata,
	accessToken,
	restaurantId,
}: {
	restaurantId: number | string;
	formdata: FormData;
	accessToken: string;
}) => {
	try {
		const res = await fetch(
			baseUrl + '/api' + `/restaurants/${restaurantId}/menus`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				body: formdata,
			},
		);
		const data = await res.json();

		if (!data.result && data.msg) {
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

		console.error('postRestaurantMenu: ', error);
		return {
			data: null,
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};
