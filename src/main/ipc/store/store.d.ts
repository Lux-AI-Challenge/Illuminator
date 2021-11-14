import Electronstore from 'electron-store';

declare global {
  type Store = Electronstore<{
    userPreferences: User.UserPreferences;
  }>;
}
