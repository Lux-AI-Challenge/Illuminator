require('regenerator-runtime/runtime');
const { contextBridge, ipcRenderer } = require('electron');

const handlers = {
  store: {
    get(val) {
      ipcRenderer.send('electron-store-get', val);
    },
    set(property, val) {
      ipcRenderer.send('electron-store-set', property, val);
    },
  },
  dimensions: {
    // TODO: for all functions name "X", auto addd these handlers?
    // annonyingly all has to be functional due to serialization and no passing of functions, is there a better way?
    makeEnv(data) {
      return ipcRenderer.invoke('dim_makeEnv', data);
    },
    runEpisode(data) {
      return ipcRenderer.invoke('dim_runEpisode', data);
    },
    closeEnv(data) {
      return ipcRenderer.invoke('dim_closeEnv', data);
    },
    runSingleEpisode(data) {
      return ipcRenderer.invoke('dim_runSingleEpisode', data);
    },
  },
  ipcRenderer: {
    on(channel, func) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    once(channel, func) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    },
  },
};
/* eslint-disable */
const wrapErrors = (handlers) => {
  /**
   * wrap all the preloaded functions so that they can return errors to then get thrown in the renderer instead of throwing in the main process
   *
   * by avoiding throwing in the main process, main process is not always printing something.
   *
   * main process can still throw errors and that will then just raise an error on the main process (which should never happen).
   */
  for (const key in handlers) {
    if (typeof handlers[key] !== 'function') {
      wrapErrors(handlers[key]);
    } else {
      // is a function
      const oldfunc = handlers[key];
      handlers[key] = async (...args) => {
        const res = await oldfunc(...args);
        if (res instanceof Error) {
          throw res;
        } else {
          return res;
        }
      };
    }
  }
};
/* eslint-enable */

wrapErrors(handlers);
contextBridge.exposeInMainWorld('electron', handlers);
