export type UserName = string | undefined;

export type Mode = 'signin' | 'signup';

export type Credentials = {
	email: string;
	password: string;
	name?: string;
	nickname?: string;
	remember?: 'true' | 'false';
	callbackUrl?: string;
};

export type UserInfo = {
	userId: number;
	email: string;
	name: string;
	nickname: string;
	phone: string;
	role: string;
	status: string;
};

export type AuthResponseData = {
	code: number;
	msg: string;
	result: null | {
		accessToken: string;
		refreshToken: string;
		generatedTime: string;
		userInfo: UserInfo;
	};
};
