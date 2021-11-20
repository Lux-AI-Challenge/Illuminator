import type { MainProcessApi } from '../types';
import * as actions from './actions';

const SystemApi = {
  prefix: 'sys',
  actions,
} as const;

export type System = typeof SystemApi;

export default SystemApi;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// @ts-expect-error - want to check for typing but ignore no unused locals here
const typecheck = SystemApi as MainProcessApi; // should error if it doesn't conform
