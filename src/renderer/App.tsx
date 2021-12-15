import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import type { UserPreferences } from 'main/ipc/user/preferences';

import * as UserActions from 'renderer/actions/user';
import UserContext from 'renderer/contexts/user';
import { setup as ipcSetup } from 'renderer/ipc/setup';
import Illuminator from 'renderer/pages/illuminator';

import './styles/index.global.scss';
import { deepMerge } from 'main/utils/deepMerge';

const App = () => {
  useEffect(() => {
    // setup code goes here
    ipcSetup();
  }, []);

  const [userPreferences, setUserPreferencesState] = useState<UserPreferences>(
    {} as UserPreferences
  );
  const setUserPreferences = (prefs: DeepPartial<UserPreferences>) => {
    const newprefs = deepMerge(userPreferences, prefs);
    setUserPreferencesState(newprefs);
    UserActions.setUserPreferences(newprefs); // TODO: woudl this be problematic with asycn out of updates?
    return newprefs;
  };

  useEffect(() => {
    // start up code?
    UserActions.getUserPreferences()
      .then((prefs) => {
        return setUserPreferencesState(prefs);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    console.log('changed', { userPreferences });
  }, [userPreferences]);

  return (
    <Router>
      <UserContext.Provider value={{ setUserPreferences, userPreferences }}>
        <Switch>
          <Route path="/" component={Illuminator} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
