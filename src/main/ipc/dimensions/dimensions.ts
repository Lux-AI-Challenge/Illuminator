import type { MainProcessApi } from '../types';
import * as actions from './actions';

const DimensionsApi = {
  prefix: 'dim',
  actions,
} as const;

export type Dimensions = typeof DimensionsApi;

export default DimensionsApi;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const typecheck = DimensionsApi as MainProcessApi; // should error if it doesn't conform
