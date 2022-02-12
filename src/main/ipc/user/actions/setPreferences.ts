import type { Action } from 'main/ipc/types';
import { deepMerge } from '../../../utils/deepMerge'; // FIX: don't know why but absolute path just doesnt work
import { DEFAULT_USER_PREFERENCES, UserPreferences } from '../preferences';

export const setPreferences: Action<
  {
    prefs: DeepPartial<UserPreferences>;
    clobber?: boolean;
  },
  UserPreferences,
  {
    store: Store;
  }
> = (ctx) => async (_event, data) => {
  let prefs = ctx.store.get('userPreferences', DEFAULT_USER_PREFERENCES);
  const clobberArrays = data.clobber ?? true;
  prefs = deepMerge(prefs, data.prefs, clobberArrays);
  ctx.store.set('userPreferences', prefs);
  return prefs;
};
