import type { Action } from 'main/ipc/types';
import { deepMerge } from '../../../utils/deepMerge'; // FIX: don't know why but absolute path just doesnt work
import { DEFAULT_USER_PREFERENCES, UserPreferences } from '../preferences';

interface Context {
  store: Store;
}

type Data = {
  prefs: DeepPartial<UserPreferences>;
  clobber?: boolean;
};

type Result = UserPreferences;

export const setPreferences: Action<Data, Result, Context> =
  (ctx) => async (_event, data) => {
    let prefs = ctx.store.get('userPreferences', DEFAULT_USER_PREFERENCES);
    const clobberArrays = data.clobber ?? true;
    prefs = deepMerge(prefs, data.prefs, clobberArrays);
    ctx.store.set('userPreferences', prefs);
    return prefs;
  };
