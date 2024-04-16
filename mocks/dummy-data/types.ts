import {
	Restaurant,
	RestaurantMenu,
	RestaurantPreview,
} from '@/app/features/restaurant/_types.ts';

export type JsonDataType = Restaurant | RestaurantPreview[] | RestaurantMenu[];
