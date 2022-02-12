import path from 'path-browserify';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useUserContext } from 'renderer/context/user';

interface EnvContext {
  html: string;
  setHtml: Dispatch<SetStateAction<string>>;

  iframe: HTMLIFrameElement | undefined;
  setIframe: Dispatch<SetStateAction<HTMLIFrameElement | undefined>>;

  env: string;
  setEnv: (env: string) => $TSFIXME;

  replayData: $TSFIXME[];
  setReplayData: Dispatch<SetStateAction<$TSFIXME[]>>;

  runEpisode: (
    env: string,
    agents: string[],
    live: boolean,
    seed?: number
  ) => Promise<{
    html?: string;
    postdata: string;
  }>;
  createEpisode: (
    env: string,
    agents: string[]
  ) => Promise<{
    html?: string;
    episodeId: string;
  }>;
  envStep: (
    // iframe: HTMLIFrameElement,
    episodeId: string
  ) => Promise<{
    postdata: string;
  }>;
}

const envContext = createContext<EnvContext | undefined>(undefined);

export const useEnvContext = () => {
  const data = useContext(envContext);
  if (data === undefined) {
    throw new Error('useEnvContext must be used inside an EnvProvider');
  }
  return data;
};

interface EnvProviderProps {
  children?: ReactNode;
}

export const EnvProvider = ({ children }: EnvProviderProps) => {
  const {
    userPreferences: { env },
    setUserPreferences,
  } = useUserContext();
  const setEnv = (filepath: string) => {
    setUserPreferences({ env: filepath });
  };

  const [html, setHtml] = useState<string>('');
  const [iframe, setIframe] = useState<HTMLIFrameElement | undefined>();

  const [replayData, setReplayData] = useState<$TSFIXME[]>([]);

  const runEpisode = async (
    envFile: string // change to env name
    // _agents: string[],
    // _live: boolean,
    // _seed?: number
  ) => {
    const envData = await window.electron.dimensions.makeEnv({ env: envFile });
    const htmlPath = path.join(path.dirname(envFile), envData.metaData.html);
    const htmlContents = (await window.electron.system.readFile(
      htmlPath
    )) as string;
    setHtml(htmlContents);
    return {
      html: htmlContents,
      postdata: 'agc',
    };
    // envData.id;
  };

  // temp storing epiode here
  // const [episodeId, setEpisodeId] = useState('');
  const createEpisode = async (envFile: string, agents: string[]) => {
    // const pyagent =
    //   '/Users/stonetao/Desktop/Coding/Projects/aicompetitions/LuxAI/Illuminator/src/main/envs/rps/agents/rand_agent.py';
    // const jsagent =
    //   '/Users/stonetao/Desktop/Coding/Projects/aicompetitions/dimensions/tests/envs/rps/agents/paper.js';
    const res = await window.electron.dimensions.createEpisode({
      env: envFile,
      agents,
    });
    // setEpisodeId(res.episodeId);
    console.log('NEW EPISODE', res.episodeId, env);
    iframe?.contentWindow?.postMessage({ agentNames: res.agentNames });
    const htmlPath = path.join(path.dirname(envFile), res.metaData.html);
    const htmlContents = await window.electron.system.readFile(htmlPath);
    setHtml(htmlContents);
    setReplayData([]);
    return {
      html: htmlContents,
      episodeId: res.episodeId,
      agentNames: res.agentNames,
    };
  };
  // todo move this to actions or smth
  const envStep = async (_episodeId: string) => {
    const res = await window.electron.dimensions.envStep({
      episodeId: _episodeId,
    });
    iframe?.contentWindow?.postMessage(
      res.results.outputs[res.results.outputs.length - 1]
    );
    setReplayData(res.results.outputs);
    return {
      postdata: JSON.stringify(res.results),
    };
  };

  const updateRenderer = async (postdata: string) => {};
  useEffect(() => {
    // timer =
    // createEpisode(envId)
    //
    return () => {
      // clearInterval(timer);
    };
  }, []);
  // useEffect(() => {
  //   setEnvStep(envStepFnc);
  // }, [iframe]);

  return (
    <envContext.Provider
      value={{
        html,
        setHtml,
        iframe,
        setIframe,
        env,
        setEnv,
        replayData,
        setReplayData,
        runEpisode,
        createEpisode,
        envStep,
      }}
    >
      {children}
    </envContext.Provider>
  );
};
