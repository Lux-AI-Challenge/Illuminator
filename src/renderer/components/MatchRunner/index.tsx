import { Button, ButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getEnvMetaData } from 'renderer/actions/engine/episode';
import { useUserContext } from 'renderer/context/user';
import { useEnvContext } from 'renderer/context/env';
import SelectAgents from 'renderer/components/SelectAgents';
import path from 'path-browserify';
import styles from './index.scss';

/**
 * Generic component. TODO probably split this up later
 */

const MatchRunner = () => {
  const { setUserPreferences, userPreferences } = useUserContext();
  const { env, createEpisode, envStep, setHtml, replayData } = useEnvContext();
  const setEnv = (filepath: string) => {
    setUserPreferences({ env: filepath });
  };
  const [agents, setAgents] = useState<Array<string>>([]);
  const [matchPaused, setMatchPaused] = useState(true);
  // initialize data from user preferences
  useEffect(() => {
    if (userPreferences.agents) {
      setAgents(userPreferences.agents);
    }
  }, [userPreferences]);
  const [episodeId, setEpisodeId] = useState('');

  let episodeDone = false;
  let canCreateMatch = false;
  let canRestartMatch = false;
  let matchReady = false;
  if (episodeId === '') {
    canCreateMatch = true;
  } else {
    canRestartMatch = true;
    canCreateMatch = false;
    matchReady = true;
  }

  const episodeIsDone = (latestStep: $TSFIXME) => {
    let dones = 0;
    const playerIds = Object.keys(latestStep.data);
    // eslint-disable-next-line no-restricted-syntax
    for (const playerId of playerIds) {
      if (latestStep.data[playerId].done) {
        dones += 1;
      }
    }
    if (dones === playerIds.length) {
      return true;
    }
    return false;
  };
  if (replayData.length) {
    episodeDone = episodeIsDone(replayData[replayData.length - 1]);
  }
  const createMatch = async () => {
    const res = await createEpisode(env, agents);
    setMatchPaused(true);
    setEpisodeId(res.episodeId);
  };
  const stepForward = async () => {
    // console.log(replayData.outputs[replayData.outputs.length - 1]);
    if (episodeDone) {
      // eslint-disable-next-line no-console
      console.warn(
        `Tried to step forward through episode ${episodeId} which already finished`
      );
      return;
    }
    await envStep(episodeId);
  };
  const runMatch = async () => {
    // runEpisode(env, [], true, 0);
    const res = await createEpisode(env, agents);
    setEpisodeId(res.episodeId);
    setMatchPaused(false);
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
  // live running functionalities
  useEffect(() => {}, []);
  useEffect(() => {
    if (!episodeId || matchPaused) {
      return () => {};
    }
    async function liverun() {
      let done = false;
      if (replayData.length) {
        done = episodeIsDone(replayData[replayData.length - 1]);
      }
      if (!done) {
        await envStep(episodeId);
      }
      if (done) {
        setMatchPaused(true);
      }
    }
    liverun();
    return () => {};
  }, [episodeId, matchPaused, replayData, envStep]);
  useEffect(() => {
    if (replayData.length) {
      console.log(JSON.parse(JSON.stringify(replayData)));
    }
    console.log(replayData.length);
  }, [replayData]);
  const onAgentsChange = (data: { agents: string[] }) => {
    setUserPreferences({ agents: data.agents });
    setAgents(data.agents);
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
      <SelectAgents agents={agents} onAgentsChange={onAgentsChange} />
      <ButtonGroup className={styles.controllers}>
        {canRestartMatch && (
          <Button onClick={createMatch} variant="contained" color="primary">
            Restart
          </Button>
        )}
        {canCreateMatch && (
          <Button onClick={createMatch} variant="contained" color="primary">
            Create Match
          </Button>
        )}
        {!episodeDone && matchReady && (
          <Button
            onClick={() => {
              setMatchPaused(!matchPaused);
            }}
            variant="contained"
            color="primary"
          >
            {matchPaused ? 'Continue' : 'Pause'}
          </Button>
        )}
        {!episodeDone && matchReady && (
          <Button onClick={stepForward} variant="contained" color="primary">
            Step
          </Button>
        )}
      </ButtonGroup>
      {/* {matchResult && (
        <div className={styles['result-box']}>
          <ReactJson src={matchResult} />
        </div>
      )} */}
    </div>
  );
};
export default MatchRunner;
