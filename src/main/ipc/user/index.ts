// import Store from 'electron-store';
import { deepMerge } from '../../utils/deepMerge';
import { handleFunc } from '../wrapper';

export const setupUser = (store: Store) => {
  handleFunc<User.Actions, 'GetPreferences'>(
    'user_GetPreferences',
    async () => {
      const prefs = store.get('userPreferences');
      console.log({ prefs });
      return prefs;
    }
  );
  handleFunc<User.Actions, 'SetPreferences'>(
    'user_SetPreferences',
    async (_event, data) => {
      let prefs = store.get('userPreferences');
      prefs = deepMerge(prefs, data);
      store.set('userPreferences', prefs);
      console.log('set', { prefs });
      return prefs;
    }
  );
};
