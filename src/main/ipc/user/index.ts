// import Store from 'electron-store';
import { handleFunc } from '../wrapper';
import { DEFAULT_USER_PREFERENCES } from './preferences';
import UserApi from './user';

export const setupUser = (store: Store) => {
  if (store.get('userPreferences') === undefined) {
    store.set('userPreferences', DEFAULT_USER_PREFERENCES);
  }

  handleFunc(UserApi, 'getPreferences', { store });
  handleFunc(UserApi, 'setPreferences', { store });
};
