import spawn from 'cross-spawn';
import { handleFunc } from '../wrapper';
import SystemApi, { System } from './system';

export const setupSystem = (store: Store) => {
  handleFunc<System, 'getPythonInterpreters'>(
    SystemApi,
    'getPythonInterpreters',
    undefined
  );

  handleFunc<System, 'fileSelect'>(SystemApi, 'fileSelect', undefined);
};
