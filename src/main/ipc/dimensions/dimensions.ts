/* eslint-disable */
import type { MainProcessApi } from '../types';
import * as actions from './actions';

const DimensionsApi = {
  prefix: 'dim',
  actions,
} as const;

export type Dimensions = typeof DimensionsApi;

export default DimensionsApi;

// @ts-expect-error - want to check for typing but ignore no unused locals here
const typecheck = DimensionsApi as MainProcessApi; // should error if it doesn't conform
