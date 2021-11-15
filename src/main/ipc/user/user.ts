import type { MainProcessApi } from '../types';
import * as actions from './actions';

const UserApi = {
  prefix: 'user',
  actions,
} as const;

export type User = typeof UserApi;

export default UserApi;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const typecheck = UserApi as MainProcessApi; // should error if it doesn't conform
