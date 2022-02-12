import path from 'path-browserify';
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { useUserContext } from 'renderer/context/user';

interface EnvContext {
  iframe: HTMLIFrameElement | undefined;
  setIframe: Dispatch<SetStateAction<HTMLIFrameElement | undefined>>;
  env: string;
  setEnv: (env: string) => $TSFIXME;
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
  html: string;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
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
  const { userPreferences, setUserPreferences } = useUserContext();
  const { env } = userPreferences;
  const setEnv = (filepath: string) => {
    setUserPreferences({ env: filepath });
  };
  const [html, setHtml] = useState<string>('');
  const [iframe, setIframe] = useState<HTMLIFrameElement | undefined>();
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
    const htmlContents = (await window.electron.system.readFile(
      htmlPath
    )) as string;
    setHtml(htmlContents);
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
    console.log('STEP', res.results);
    iframe?.contentWindow?.postMessage(
      res.results.outputs[res.results.outputs.length - 1]
    );
    console.log({ envStepRes: res });
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
        env,
        setEnv,
        runEpisode,
        createEpisode,
        envStep,
        html,
        setHtml,
        iframe,
        setIframe,
      }}
    >
      {children}
    </envContext.Provider>
  );
};
