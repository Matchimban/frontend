export type UserName = string | undefined;

export type Mode = 'signin' | 'signup';

export type AuthResponseData = {
	code: number;
	msg: string;
	result: null | {
		accessToken: string;
		refreshToken: string;
	};
};
