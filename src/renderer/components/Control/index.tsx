import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { runSingleEpisode } from 'renderer/actions/engine/episode';
import { EnvProvider } from 'renderer/contexts/env';
import ReactJson from 'react-json-view';
import SelectPythonInterpreter from 'renderer/components/SelectPythonInterpreter';
import { Dimensions } from 'main/ipc/dimensions/dimensions';
import UserContext from 'renderer/contexts/user';
import styles from './control.scss';

/**
 * Generic component. TODO probably split this up later
 */

const Control = () => {
  const { userPreferences, setUserPreferences } = useContext(UserContext);
  const { env } = userPreferences;
  const setEnv = (filepath: string) => {
    setUserPreferences({ env: filepath });
  };
  const [matchResult, setMatchResult] = useState<
    Awaited<ReturnType<ReturnType<Dimensions['actions']['runSingleEpisode']>>> // TODO: maybe extract some of these input/ouput types to somewhere else?
  >({
    final: 'abc',
  });
  const runMatch = () => {
    runSingleEpisode(env, [], 0)
      .then((res) => {
        console.log({ res });
        setMatchResult(res);
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  };
  // TODO move this out of this component
  const selectEnvironment = async () => {
    // window.electron.store.get(STORE.ENV).then(console.log)
    // console.log({oldenv});
    const filepath = await window.electron.system.fileSelect({
      title: 'Python env file',
      message: 'test message',
      properties: ['openFile'],
      filters: [
        { name: 'All files', extensions: ['*'] },
        { name: 'Python files', extensions: ['py'] },
      ],
    });
    console.log(filepath);
    if (filepath) {
      // const newEnv = filepath;
      setEnv(filepath);
      // window.electron.store.set(STORE.ENV, newEnv);
    }
  };
  return (
    <div className={styles.Control}>
      <EnvProvider value={{ setEnv, env }}>
        <SelectPythonInterpreter />
        <Button
          variant="contained"
          component="label"
          onClick={selectEnvironment}
        >
          Select Environment
        </Button>
        <div>env file: {env || ''}</div>
        <Button onClick={runMatch} variant="contained" color="primary">
          Run Match
        </Button>
        {matchResult && (
          <div className={styles['result-box']}>
            <ReactJson src={matchResult} />
          </div>
        )}
      </EnvProvider>
    </div>
  );
};
export default Control;
