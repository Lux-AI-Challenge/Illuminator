interface Window {
  electron: {
    store: {
      get: (key: string) => any;
      set: (key: string, val: any) => void;
      // any other methods you've defined...
    };
    dimensions: {
      makeEnv(data: MakeEnvIn): Promise<MakeEnvRet>;
      runEpisode(data: RunEpisodeIn): Promise<RunEpisodeRet>;
      runSingleEpisode(data: RunSingleEpisodeIn): Promise<RunSingleEpsiodeRet>;
    };
    ipcRenderer: {
      on(channel: string, func: (...args: any[]) => any): void;
      once(channel: string, func: (...args: any[]) => any): void;
    };
  };
}
