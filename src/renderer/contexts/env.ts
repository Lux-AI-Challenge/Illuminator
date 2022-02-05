import React from 'react';

// set UserContext and add type
const EnvContext = React.createContext(
  {} as {
    iframe?: HTMLIFrameElement;
    setIframe: React.Dispatch<
      React.SetStateAction<HTMLIFrameElement | undefined>
    >;
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
    createEpisode: (env: string) => Promise<{
      html?: string;
      episodeId: string;
    }>;
    envStep: (
      // iframe: HTMLIFrameElement,
      episodeId: string
    ) => Promise<{
      postdata: string;
    }>;
    setHtml: React.Dispatch<React.SetStateAction<string>>;
  }
);

export const EnvProvider = EnvContext.Provider;
export const EnvConsumer = EnvContext.Consumer;
export default EnvContext;
