import type { Action } from 'main/ipc/types';
import type { UserPreferences } from '../preferences';

export const getPreferences: Action<void, UserPreferences, { store: Store }> =
  (ctx) => async () => {
    const prefs = ctx.store.get('userPreferences');
    return prefs;
  };
