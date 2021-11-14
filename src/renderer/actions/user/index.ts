export const getUserPreferences = async () => {
  return window.electron.user.GetPreferences();
};
export const setUserPreferences = async (
  prefs: DeepPartial<User.UserPreferences>
) => {
  return window.electron.user.SetPreferences(prefs);
};
