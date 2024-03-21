export type NavLink = {
	name: string;
	href: string;
	icon?: string;
};

export interface ResponseData<T> {
	code: number;
	msg: string | null;
	result: T;
}
