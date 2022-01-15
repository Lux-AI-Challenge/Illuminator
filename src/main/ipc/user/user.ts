/* eslint-disable @typescript-eslint/no-unused-vars */
import type { MainProcessApi } from '../types';
import * as actions from './actions';

const UserApi = {
  prefix: 'user',
  actions,
} as const;

export type User = typeof UserApi;

export default UserApi;

// @ts-expect-error - want to check for typing but ignore no unused locals here
const typecheck = UserApi as MainProcessApi; // should error if it doesn't conform
