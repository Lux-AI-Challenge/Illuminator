import type Electronstore from 'electron-store';
import type { Dimensions } from 'main/ipc/dimensions/dimensions';
import type { System } from 'main/ipc/system/system';
import type { User } from 'main/ipc/user/user';
import type { UserPreferences } from 'main/ipc/user/preferences';
import type { Handlers } from 'main/ipc/types';

// extract all ipc handler functions from a actions interface

declare global {
  type $TSFIXME = any;

  type Store = Electronstore<{
    userPreferences: UserPreferences;
  }>;

  interface Window {
    electron: {
      store: {
        get: (key: string) => any;
        set: (key: string, val: any) => void;
        // any other methods you've defined...
      };
      dimensions: Handlers<Dimensions>;
      user: Handlers<User>;
      system: Handlers<System>;
      ipcRenderer: {
        on(channel: string, func: (...args: any[]) => any): void;
        once(channel: string, func: (...args: any[]) => any): void;
      };
    };
  }
}
