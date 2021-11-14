// import Store from 'electron-store';
import { deepMerge } from '../../utils/deepMerge';
import { handleFunc } from '../wrapper';

const DEFAULT_USER_PREFERENCES: User.UserPreferences = {
  env: '',
  mostRecentEnvs: [],
  pythonInterpreter: 'python',
};
export const setupUser = (store: Store) => {
  if (store.get('userPreferences') === undefined) {
    store.set('userPreferences', DEFAULT_USER_PREFERENCES);
  }

  handleFunc<User.Actions, 'GetPreferences'>(
    'user_GetPreferences',
    async () => {
      const prefs = store.get('userPreferences');
      return prefs;
    }
  );
  handleFunc<User.Actions, 'SetPreferences'>(
    'user_SetPreferences',
    async (_event, data) => {
      let prefs = store.get('userPreferences') ?? {};
      prefs = deepMerge(prefs, data);
      store.set('userPreferences', prefs);
      return prefs;
    }
  );
};
