import { fromAddress, setKey } from 'react-geocode';

import { GOOGLE_MAPS_API_KEY } from '@/app/constants/keys.ts';

setKey(GOOGLE_MAPS_API_KEY || '');

export function useGetCoordinate() {
	const getCoordinate = async (address: string) => await fromAddress(address);

	return { getCoordinate };
}
