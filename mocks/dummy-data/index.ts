import {
	Restaurant,
	RestaurantMenu,
	RestaurantPreview,
} from '@/app/features/restaurant/_types.ts';
import { Filenames } from '@/mocks/dummy-data/constants.ts';
import { getJSON } from '@/mocks/dummy-data/helpers.ts';

export const getDummyData = async () => {
	const [dummy_restaurants, dummy_restaurant, dummy_menu] = await Promise.all([
		getJSON<RestaurantPreview[]>(Filenames.restautrants),
		getJSON<Restaurant>(Filenames.restautrant),
		getJSON<RestaurantMenu[]>(Filenames.menu),
	]);

	return {
		restaurants: dummy_restaurants,
		restautrant: dummy_restaurant,
		menu: dummy_menu,
	};
};

// export const getDummyRestaurant = async (id: number) => {
// 	const restaurants = await getJSON(Filenames.restautrants);
// 	const restaurantsFilteredById = restaurants.filter(item => item.id === id);

// 	return restaurantsFilteredById[0];
// };
