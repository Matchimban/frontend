export type UserName = string | undefined;

export type SigninResponseData = {
	code: number;
	msg: string;
	result: null | {
		accessToken: string;
		refreshToken: string;
	};
};
