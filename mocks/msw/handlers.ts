import { http, HttpResponse } from 'msw';

import { baseUrl } from '@/app/constants/path.ts';
import { getDummyData } from '@/mocks/dummy-data';

export const handlers = [
	http.get(baseUrl + '/api' + '/restaurants', async () => {
		const { restaurants } = await getDummyData();

		return HttpResponse.json(
			{
				code: 20000,
				msg: null,
				result: restaurants,
			},
			{
				status: 200,
			},
		);
	}),
	http.get(baseUrl + '/api' + '/restaurants/0', async () => {
		const { restautrant } = await getDummyData();
		return HttpResponse.json(
			{
				code: 20000,
				msg: null,
				result: restautrant,
			},
			{ status: 200 },
		);
	}),
	http.get(baseUrl + '/api' + '/restaurants/0/menus', async () => {
		const { menu } = await getDummyData();
		return HttpResponse.json(
			{
				code: 20000,
				msg: null,
				result: menu,
			},
			{ status: 200 },
		);
	}),
];
