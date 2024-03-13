import { GetProp, UploadProps } from 'antd';

export type RestaurantField = {
	category: string;
	name: string;
	businessNumber: string;
	originCountry: string;
	addrSido: string;
	addrSigg: string;
	addrEmd: string;
	addrDetail: string;
	latitude: number;
	longitude: number;
	introduction: string;
	telephone: string;
	businessHours: string;
	closedDays: string;
	notice: string;
};

export type ImageField = {
	category: string;
	image: string;
}[];

export type MenuField = { name: string; price: number; image: string }[];

export type RegisterFields = {
	restaurant: RestaurantField;
	images: ImageField;
	menus: MenuField;
};

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export interface Restaurant {
	id: number;
	userId: number;
	category: string;
	name: string;
	businessNumber: string;
	introduction: string;
	telephone: string;
	businessHours: any;
	closedDays: string;
	notice: string;
	originCountry: string;
	status: string;
	address: Address;
}

export interface Address {
	addrSido: string;
	addrSigg: string;
	addrEmd: string;
	addrDetail: string;
	latitude: number;
	longitude: number;
}
