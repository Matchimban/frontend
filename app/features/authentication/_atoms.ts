import { atom } from 'recoil';

import type { UserName } from '@/app/features/authentication/_types.ts';

export const RC_userName = atom<UserName>({
	key: 'userName',
	default: undefined,
});
