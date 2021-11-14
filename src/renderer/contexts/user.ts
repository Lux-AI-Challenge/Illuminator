import React from 'react';

// set UserContext and add type
const UserContext = React.createContext(
  {} as {
    userPreferences: User.UserPreferences;
    setUserPreferences: (
      prefs: DeepPartial<User.UserPreferences>
    ) => Promise<User.UserPreferences>;
  }
);

export const DEFAULT_USER_PREFERENCES: User.UserPreferences = {
  env: '',
  mostRecentEnvs: [],
  pythonInterpreter: 'python',
};

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
