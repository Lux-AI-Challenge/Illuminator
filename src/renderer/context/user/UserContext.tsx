import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserPreferences } from 'main/ipc/user/preferences';
import { deepMerge } from 'main/utils/deepMerge';
import * as UserActions from 'renderer/actions/user';

interface UserContext {
  userPreferences: UserPreferences;
  setUserPreferences: (
    prefs: DeepPartial<UserPreferences>
  ) => Promise<UserPreferences>;
}

// set UserContext and add type
const userContext = createContext<UserContext | undefined>(undefined);

export const useUserContext = () => {
  const data = useContext(userContext);
  if (data === undefined) {
    throw new Error('useUserContext must be used inside a UserProvider');
  }
  return data;
};

interface UserProviderProps {
  children?: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userPreferences, setUserPreferencesInternal] =
    useState<UserPreferences>({} as UserPreferences);

  const setUserPreferences = (prefs: DeepPartial<UserPreferences>) => {
    const newprefs = deepMerge(userPreferences, prefs);
    setUserPreferencesInternal(newprefs);
    UserActions.setUserPreferences(newprefs); // TODO: woudl this be problematic with asycn out of updates?
    return newprefs;
  };

  useEffect(() => {
    // start up code?
    UserActions.getUserPreferences()
      .then((prefs) => {
        return setUserPreferencesInternal(prefs);
      })
      .catch(console.error);
  }, []);

  // useEffect(() => {
  //   console.log('changed', { userPreferences });
  // }, [userPreferences]);

  return (
    <userContext.Provider value={{ userPreferences, setUserPreferences }}>
      {children}
    </userContext.Provider>
  );
};
