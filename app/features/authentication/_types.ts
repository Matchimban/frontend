export type UserName = string | undefined;

export type Mode = 'signin' | 'signup';

export interface Credentials {
	email: string;
	password: string;
	name?: string;
	nickname?: string;
	phone?: string;
	remember?: 'true' | 'false';
	callbackUrl?: string;
}

export interface UserInfo {
	userId: number;
	email: string;
	name: string;
	nickname: string;
	phone: string;
	role: string;
	status: string;
}

export interface AuthResult {
	accessToken: string;
	refreshToken: string;
	generatedTime: string;
	userInfo: UserInfo;
}
