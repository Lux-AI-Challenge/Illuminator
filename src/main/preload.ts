import 'regenerator-runtime/runtime';
import { contextBridge, ipcRenderer } from 'electron';
import { invokeFunc } from './ipc/wrapper';
import type { Dimensions } from './ipc/dimensions/dimensions';
import type { User } from './ipc/user/user';
import type { System } from './ipc/system/system';

const handlers: Window['electron'] = {
  store: {
    get(val) {
      return ipcRenderer.invoke('electron-store-get', val);
    },
    set(property, val) {
      return ipcRenderer.invoke('electron-store-set', property, val);
    },
  },
  dimensions: {
    makeEnv(data) {
      return invokeFunc<Dimensions, 'makeEnv'>('dim_makeEnv', data);
    },
    closeEnv(data) {
      return invokeFunc<Dimensions, 'closeEnv'>('dim_closeEnv', data);
    },
    runEpisode(data) {
      return invokeFunc<Dimensions, 'runEpisode'>('dim_runEpisode', data);
    },
    runSingleEpisode(data) {
      return invokeFunc<Dimensions, 'runSingleEpisode'>(
        'dim_runSingleEpisode',
        data
      );
    },
    initializeAgents(data) {
      return invokeFunc<Dimensions, 'initializeAgents'>(
        'dim_initializeAgents',
        data
      );
    },
    envRegisterAgents(data) {
      return invokeFunc<Dimensions, 'envRegisterAgents'>(
        'dim_envRegisterAgents',
        data
      );
    },
    envStep(data) {
      return invokeFunc<Dimensions, 'envStep'>('dim_envStep', data);
    },
    createEpisode(data) {
      return invokeFunc<Dimensions, 'createEpisode'>('dim_createEpisode', data);
    },
  },
  user: {
    getPreferences(data) {
      return invokeFunc<User, 'getPreferences'>('user_getPreferences', data);
    },
    setPreferences(data) {
      return invokeFunc<User, 'setPreferences'>('user_setPreferences', data);
    },
  },
  system: {
    getPythonInterpreters(data) {
      return invokeFunc<System, 'getPythonInterpreters'>(
        'sys_getPythonInterpreters',
        data
      );
    },
    fileSelect(data) {
      return invokeFunc<System, 'fileSelect'>('sys_fileSelect', data);
    },
    readFile(data) {
      return invokeFunc<System, 'readFile'>('sys_readFile', data);
    },
  },
  ipcRenderer: {
    on(channel, func) {
      ipcRenderer.on(channel, (_event, ...args) => func(...args));
    },
    once(channel, func) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

/* eslint-disable */
const wrapErrors = (handlers: any) => {
  /**
   * wrap all the preloaded functions so that they can return errors to then get thrown in the renderer instead of throwing in the main process
   *
   * by avoiding throwing in the main process, main process is not always printing something.
   *
   * main process can still throw errors and that will then just raise an error on the main process (which should never happen).
   */
  for (const key in handlers) {
    if (handlers[key] instanceof Function) {
      const oldfunc = handlers[key];
      const newfunc = async (...args: Parameters<typeof oldfunc>) => {
        const res = await oldfunc(...args);
        if (res instanceof Error) {
          throw res;
        } else {
          return res;
        }
      };
      handlers[key] = newfunc;
    } else {
      wrapErrors(handlers[key]);
    }
  }
};
/* eslint-enable */

wrapErrors(handlers);
contextBridge.exposeInMainWorld('electron', handlers);
