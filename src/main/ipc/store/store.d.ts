import Electronstore from 'electron-store';

declare global {
  type Store = Electronstore<{
    store_env: string;
    store_user_preferences: User.UserPreferences;
  }>;
}
