import * as actions from './actions';

const DimensionsApi = {
  prefix: 'dim',
  actions,
} as const;

export type Dimensions = typeof DimensionsApi;

export default DimensionsApi;
