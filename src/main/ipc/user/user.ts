import * as actions from './actions';

const UserApi = {
  prefix: 'user',
  actions,
} as const;

export type User = typeof UserApi;

export default UserApi;
