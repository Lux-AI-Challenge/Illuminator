import React from 'react';
import type { UserPreferences } from 'main/ipc/user/preferences';

// set UserContext and add type
const UserContext = React.createContext(
  {} as {
    userPreferences: UserPreferences;
    setUserPreferences: (
      prefs: DeepPartial<UserPreferences>
    ) => Promise<UserPreferences>;
  }
);

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
export default UserContext;
