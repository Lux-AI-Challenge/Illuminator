import type { UserPreferences } from 'main/ipc/user/preferences';

export const getUserPreferences = async () => {
  return window.electron.user.getPreferences();
};
export const setUserPreferences = async (
  prefs: DeepPartial<UserPreferences>
) => {
  return window.electron.user.setPreferences(prefs);
};
