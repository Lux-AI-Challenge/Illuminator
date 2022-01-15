/* eslint-disable */
import type { MainProcessApi } from '../types';
import * as actions from './actions';

const DimensionsApi = {
  prefix: 'dim',
  actions,
} as const;

export type Dimensions = typeof DimensionsApi;

export default DimensionsApi;

const typecheck = DimensionsApi as MainProcessApi; // should error if it doesn't conform
