/**
 * Setup the ipc handlers
 */
export const setup = () => {
  window.electron.ipcRenderer.on('stdout', (...args) => {
    console.log(...args);
  });
  window.electron.ipcRenderer.on('stderr', (...args) => {
    console.error(...args);
  });
};
