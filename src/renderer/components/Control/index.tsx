import { Button } from '@mui/material';
import React, { useState } from 'react';
import { getEnvMetaData } from 'renderer/actions/engine/episode';
import ReactJson from 'react-json-view';
// import SelectPythonInterpreter from 'renderer/components/SelectPythonInterpreter';
import { Dimensions } from 'main/ipc/dimensions/dimensions';
import { useUserContext } from 'renderer/context/user';
import { useEnvContext } from 'renderer/context/env';
import path from 'path-browserify';
import styles from './control.scss';

/**
 * Generic component. TODO probably split this up later
 */

const Control = () => {
  const { setUserPreferences } = useUserContext();
  const { env, createEpisode, envStep, setHtml } = useEnvContext();
  const setEnv = (filepath: string) => {
    setUserPreferences({ env: filepath });
  };
  const [episodeId, setEpisodeId] = useState('');
  const [matchResult, setMatchResult] = useState<
    Awaited<ReturnType<ReturnType<Dimensions['actions']['runSingleEpisode']>>> // TODO: maybe extract some of these input/ouput types to somewhere else?
  >({
    final: 'abc',
  });

  const runMatch = async () => {
    // runEpisode(env, [], true, 0);
    const res = await createEpisode(env);
    setEpisodeId(res.episodeId);
    const { postdata } = await envStep(res.episodeId);
    // runSingleEpisode(env, [], 0)
    //   .then((res) => {
    //     console.log({ res });
    //     setMatchResult(res);
    //     return res;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const createMatch = async () => {
    // runEpisode(env, [], true, 0);
    const res = await createEpisode(env);
    setEpisodeId(res.episodeId);
    // const { postdata } = await envStep(res.episodeId);
    // runSingleEpisode(env, [], 0)
    //   .then((res) => {
    //     console.log({ res });
    //     setMatchResult(res);
    //     return res;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };
  const stepForward = async () => {
    const { postdata } = await envStep(episodeId);
  };

  // TODO move this out of this component
  /**
   * Select environment file and also setup renderer
   */
  const selectEnvironment = async () => {
    const filepath = await window.electron.system.fileSelect({
      title: 'Python env file',
      message: 'test message',
      properties: ['openFile'],
      filters: [
        { name: 'All files', extensions: ['*'] },
        { name: 'Python files', extensions: ['py'] },
      ],
    });
    if (filepath) {
      setEnv(filepath);
      const metaData = await getEnvMetaData(filepath);
      console.log({ metaData });
      const htmlPath = path.join(path.dirname(filepath), metaData.html);
      const html = (await window.electron.system.readFile(htmlPath)) as string;
      setHtml(html);
    }
  };
  return (
    <div className={styles.Control}>
      <Button variant="contained" component="label" onClick={selectEnvironment}>
        Select Environment
      </Button>
      <div>env file: {env || ''}</div>
      <Button onClick={createMatch} variant="contained" color="primary">
        Create Match
      </Button>
      <Button onClick={stepForward} variant="contained" color="primary">
        Step
      </Button>
      {matchResult && (
        <div className={styles['result-box']}>
          <ReactJson src={matchResult} />
        </div>
      )}
    </div>
  );
};
export default Control;
