import type { Action } from 'main/ipc/types';
import type { UserPreferences } from '../preferences';

interface Context {
  store: Store;
}

type Data = void;

type Result = UserPreferences;

export const getPreferences: Action<Data, Result, Context> =
  (ctx) => async () => {
    const prefs = ctx.store.get('userPreferences');
    return prefs;
  };
