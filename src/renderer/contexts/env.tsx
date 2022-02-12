import { createContext, useContext, useState } from 'react';
import path from 'path-browserify';

// set UserContext and add type
export interface EnvContext {
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
  // createEpisode: (env: string) => Promise<{
  //   episodeId: string;
  // }>;
  // envStep: (env: string) => Promise<{
  //   postdata: string;
  // }>;
}

const envContext = createContext<EnvContext | undefined>({} as EnvContext);

export const useEnvContext = () => {
  const data = useContext(envContext);

  if (data === undefined) {
    throw new Error('useEnvContext must be used inside an EnvProvider');
  }

  return data;
};

export const EnvProvider: React.FC = ({ children }) => {
  const { userPreferences, setUserPreferences } = useContext(UserContext);
  const { env } = userPreferences;
  const setEnv = (filepath: string) => {
    setUserPreferences({ env: filepath });
  };
  const [html, setHtml] = useState('');
  const runEpisode = async (
    envFile: string, // change to env name
    _agents: string[],
    _live: boolean,
    _seed?: number
  ) => {
    const envData = await window.electron.dimensions.makeEnv({ env: envFile });
    const htmlPath = path.join(path.dirname(envFile), envData.metaData.html);
    const html2 = (await window.electron.system.readFile(htmlPath)) as string;
    setHtml(html2);
    return {
      html: html2,
      postdata: 'agc',
    };
    // envData.id;
  };

  return (
    <envContext.Provider value={{ setEnv, env, runEpisode }}>
      {children}
    </envContext.Provider>
  );
};
