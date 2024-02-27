import { getJSON } from '@/app/__tests__/__mocks__/dummy-data/helpers.ts';
import { filenames } from '@/app/__tests__/__mocks__/dummy-data/types.ts';

export const getDummyData = async () => {
	const [dummy_restaurants] = await Promise.all([
		getJSON(filenames.restautrants),
	]);

	return {
		restaurants: dummy_restaurants,
	};
};

export const getDummyRestaurant = async (id: number) => {
	const restaurants = await getJSON(filenames.restautrants);
	const restaurantsFilteredById = restaurants.filter(item => item.id === id);

	return restaurantsFilteredById[0];
};
