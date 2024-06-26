import { GetProp, UploadProps } from 'antd';

export type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export enum MenuCategory {
	'KOREA' = '한식',
	'CHINA' = '중식',
	'JAPAN' = '일식',
}

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
	images: Images[];
}

export interface Address {
	addrSido: string;
	addrSigg: string;
	addrEmd: string;
	addrDetail: string;
	latitude: number;
	longitude: number;
}

export interface Images {
	id: number;
	restaurantId: number;
	originFileName: string;
	savedFileUrl: string;
}

export interface RestaurantPreview {
	id: number;
	name: string;
	category: 'KOREA' | 'CHINA' | 'JAPAN';
	addrSido: string;
	imageUrl: string;
}

export interface RestaurantMenu {
	id: number;
	name: string;
	price: number;
	imageUrl: Array<{ imageId: number; savedFileUrl: string }>;
}
