interface EnvInfo {
  name: string;
  id: string;
}
interface Window {
  electron: {
    store: {
      get: (key: string) => any;
      set: (key: string, val: any) => void;
      // any other methods you've defined...
    };
    dimensions: {
      makeEnv(env: string): EnvInfo;
    };
    ipcRenderer: {
      myPing(): void;
      on(channel: string, func: (...args: any[]) => any): void;
      once(channel: string, func: (...args: any[]) => any): void;
    };
  };
}
