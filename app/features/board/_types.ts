export type NavLink = {
	name: string;
	href: string;
	icon?: string;
};

export interface RestaurantPreview {
	id: number;
	name: string;
	category: string;
	addrSido: string;
	imageUrl: string;
}
