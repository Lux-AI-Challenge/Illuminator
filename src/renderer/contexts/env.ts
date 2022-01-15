import React from 'react';

// set UserContext and add type
const EnvContext = React.createContext(
  {} as {
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
);

export const EnvProvider = EnvContext.Provider;
export const EnvConsumer = EnvContext.Consumer;
export default EnvContext;
