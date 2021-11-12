// import Store from 'electron-store';
import { handleFunc } from '../wrapper';

export const setupUser = (store: Store) => {
  handleFunc<User.Actions, 'GetPreferences'>(
    'user_GetPreferences',
    async () => {
      return store.get('store_user_preferences');
    }
  );
};
