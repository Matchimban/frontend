import { baseUrl } from '@/app/constants/path.ts';
import {
	AuthResult,
	Credentials,
} from '@/app/features/authentication/_types.ts';
import { ResponseData } from '@/app/types/index.ts';

export const postSignup = async (credentials: Credentials) => {
	try {
		const res = await fetch(baseUrl + '/api' + '/user/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...credentials,
			}),
		});

		const data: ResponseData<null> = await res.json();

		if (!data.result && data.msg) {
			throw data.msg;
		}

		return {
			error: null,
		};
	} catch (error) {
		if (typeof error === 'string') {
			return {
				error,
			};
		}

		console.error('postSignup:', error);
		return {
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};

export const postSignin = async (credentials: Credentials) => {
	try {
		const response = await fetch(baseUrl + '/api' + '/user/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		});

		const data: ResponseData<AuthResult> = await response.json();

		if (!data.result && data.msg) {
			// const error = new Error('Login Failed!');
			// error.message = data.msg;
			throw data.msg;
		}

		return {
			data: data.result,
			error: null,
		};
	} catch (error) {
		if (typeof error === 'string') {
			return {
				data: null,
				error,
			};
		}

		console.error('deleteSignout:', error);
		return {
			data: null,
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};

export const postRefresh = async (
	accessToken: string,
	refreshToken: string,
) => {
	try {
		const response = await fetch(baseUrl + '/api' + '/user/refresh', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify({
				accessToken,
				refreshToken,
			}),
		});
		const data: ResponseData<AuthResult> = await response.json();

		if (!data.result && data.msg) throw data.msg;

		return {
			data: data.result,
			error: null,
		};
	} catch (error) {
		if (typeof error === 'string') {
			return {
				data: null,
				error,
			};
		}

		console.error('deleteSignout:', error);
		return {
			data: null,
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};

export const deleteSignout = async (accessToken: string) => {
	try {
		const res = await fetch(baseUrl + '/api' + '/user/logout', {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const data: ResponseData<null> = await res.json();

		if (!data.result && data.msg) {
			throw data.msg;
		}

		return {
			error: null,
		};
	} catch (error) {
		// 로그아웃이 에러 핸들링이 필요할까?
		// api에 문제가 생기든 상관없이 무조건 로그아웃 처리하는게 보안적으로 좋지 않을까?
		if (typeof error === 'string') {
			return {
				error,
			};
		}

		console.error('deleteSignout:', error);
		return {
			error: '알 수 없는 오류가 발생하였습니다.',
		};
	}
};
