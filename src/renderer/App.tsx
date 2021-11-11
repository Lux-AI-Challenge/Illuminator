import React, { useEffect } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import Control from 'renderer/components/Control';
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

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
