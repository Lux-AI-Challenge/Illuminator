// import Store from 'electron-store';
import { handleFunc } from '../wrapper';

export const setupUser = (store: Store) => {
  handleFunc<User.Actions['GetPreferences']>(
    'user_getPreferences',
    async () => {
      return store.get('store_user_preferences');
    }
  );
};
