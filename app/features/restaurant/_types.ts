import { GetProp, UploadProps } from 'antd';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export interface RestaurantField {
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
}

export interface ImageField {
	category: string;
	image: string;
}
[];

export type MenuField = { name: string; price: number; image: string }[];

export interface RegisterFields {
	restaurant: RestaurantField;
	images: ImageField;
	menus: MenuField;
}

export interface RegisterResponse {
	field: string;
	msg: string;
	invalidValue: string;
	kind: string;
}

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

export interface RestaurantPreview {
	id: number;
	name: string;
	category: string;
	addrSido: string;
	imageUrl: string;
}
