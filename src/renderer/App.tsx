import React, { useEffect } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';

import { UserProvider } from 'renderer/context/user';
import { setup as ipcSetup } from 'renderer/ipc/setup';
import Illuminator from 'renderer/pages/illuminator';

import './styles/index.global.scss';

const App = () => {
  useEffect(() => {
    // setup code goes here
    ipcSetup();
  }, []);

  return (
    <Router>
      <UserProvider>
        <Switch>
          <Route path="/" component={Illuminator} />
        </Switch>
      </UserProvider>
    </Router>
  );
};

export default App;
