/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPreferences } from './actions/getPreferences';
import { setPreferences } from './actions/setPreferences';
import type { MainProcessApi } from '../types';

const UserApi = {
  prefix: 'user',
  actions: {
    getPreferences,
    setPreferences,
  },
} as const;

export type User = typeof UserApi;

export default UserApi;

const typecheck = UserApi as MainProcessApi; // should error if it doesn't conform
