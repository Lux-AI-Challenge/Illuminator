import React, { useEffect, useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import * as UserActions from 'renderer/actions/user';
import Control from 'renderer/components/Control';
import UserContext, { DEFAULT_USER_PREFERENCES } from 'renderer/contexts/user';
import { setup as ipcSetup } from 'renderer/ipc/setup';
import './App.global.css';

const Hello = () => {
  useEffect(() => {
    // setup code goes here
    ipcSetup();
  }, []);
  return (
    <div>
      <h1>Illuminator</h1>
      <div>
        <Control />
      </div>
    </div>
  );
};

const App = () => {
  const [userPreferences, setUserPreferencesState] = useState(
    DEFAULT_USER_PREFERENCES
  );
  const setUserPreferences = async (
    prefs: DeepPartial<User.UserPreferences>
  ) => {
    console.log({ prefs });
    const newprefs = await UserActions.setUserPreferences(prefs);
    console.log({ newprefs });
    setUserPreferencesState(newprefs);
    return newprefs;
  };
  useEffect(() => {
    // start up code?
    UserActions.getUserPreferences()
      .then((prefs) => {
        console.log({ prefs });
        return setUserPreferences(prefs);
      })
      .catch(console.error);
  }, []);
  useEffect(() => {
    console.log({ userPreferences });
  }, [userPreferences]);
  return (
    <Router>
      <UserContext.Provider value={{ setUserPreferences, userPreferences }}>
        <Switch>
          <Route path="/" component={Hello} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
