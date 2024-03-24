import { User } from 'next-auth';
import { atom } from 'recoil';

import { type UserName } from '@/app/features/authentication/_types.ts';

export const RC_userName = atom<UserName>({
	key: 'userName',
	default: undefined,
});

export const RC_user = atom<User | null | undefined>({
	key: 'user',
	default: undefined,
});
