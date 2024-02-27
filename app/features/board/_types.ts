export type NavLink = {
	name: string;
	href: string;
	icon?: string;
};

export interface Restaurant {
	id: number;
	name: string;
	category: string;
	addrSido: string;
	images: string;
}
