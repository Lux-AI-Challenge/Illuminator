// i really don't know where to put this, but we need to make a call to find all python interpreters
export const getPythonInterpreters = async () => {
  return window.electron.system.getPythonInterpreters();
};
