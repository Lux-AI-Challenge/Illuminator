/* eslint-disable @typescript-eslint/no-explicit-any */
type $TSFIXME = any;

// extract all ipc handler functions from a actions interface
type ExtractHandlers<Actions extends Record<string, any>> = {
  [Action in keyof Actions]: (
    data: Actions[Action]['in']
  ) => Promise<Actions[Action]['out']>;
};

interface Window {
  electron: {
    store: {
      get: (key: string) => any;
      set: (key: string, val: any) => void;
      // any other methods you've defined...
    };
    dimensions: ExtractHandlers<Dimensions.Actions>;
    user: ExtractHandlers<User.Actions>;
    system: ExtractHandlers<System.Actions>;
    ipcRenderer: {
      on(channel: string, func: (...args: any[]) => any): void;
      once(channel: string, func: (...args: any[]) => any): void;
    };
  };
}
