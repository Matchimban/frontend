import { fromAddress, setKey } from 'react-geocode';

setKey(process.env.GOOGLE_MAPS_API_KEY || '');

export function useGetCoordinate() {
	const getCoordinate = async (address: string) => await fromAddress(address);

	return { getCoordinate };
}
