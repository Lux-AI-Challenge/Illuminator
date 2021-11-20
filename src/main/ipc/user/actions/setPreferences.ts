import type { Action } from 'main/ipc/types';
import { deepMerge } from '../../../utils/deepMerge'; // FIX: don't know why but absolute path just doesnt work
import { DEFAULT_USER_PREFERENCES, UserPreferences } from '../preferences';

interface Context {
  store: Store;
}

type Data = DeepPartial<UserPreferences>;

type Result = UserPreferences;

export const setPreferences: Action<Data, Result, Context> =
  (ctx) => async (_event, data) => {
    let prefs = ctx.store.get('userPreferences', DEFAULT_USER_PREFERENCES);
    prefs = deepMerge(prefs, data);
    ctx.store.set('userPreferences', prefs);
    return prefs;
  };
