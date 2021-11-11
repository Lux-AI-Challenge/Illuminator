import React, { useEffect } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.global.css';

const Hello = () => {
  useEffect(() => {
    if (window.electron) {
      window.electron.ipcRenderer.on('ipc-example', (arg: string) => {
        console.log('TEST!');
        console.log(arg);
      });
      window.electron.ipcRenderer.on('dim_makeEnv', (envInfo: EnvInfo) => {
        console.log({ envInfo });
      });
      window.electron.dimensions.makeEnv(
        '/Users/stonetao/Desktop/Coding/Projects/aicompetitions/dimensions/tests/envs/rps/env.py'
      );
    }
  }, [window.electron]);
  const sendMessage = () => {};
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>Illuminator</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
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
