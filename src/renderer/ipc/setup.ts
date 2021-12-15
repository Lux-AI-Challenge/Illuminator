/* eslint-disable no-console */
/**
 * Setup the ipc handlers
 */
export const setup = () => {
  if (window.electron) {
    window.electron.ipcRenderer.on('stdout', (...args) => {
      console.log(...args);
    });
    window.electron.ipcRenderer.on('stderr', (...args) => {
      console.error(...args);
    });
  }
};
