import spawn from 'cross-spawn';
import { handleFunc } from '../wrapper';

export const setupSystem = (store: Store) => {
  handleFunc<System.Actions['GetPythonInterpreters']>(
    'sys_GetPythonInterpreters',
    async () => {
      // execSync('')
      // TODO:
      return [];
    }
  );
};
