import spawn from 'cross-spawn';
import { handleFunc } from '../wrapper';
import SystemApi from './system';

export const setupSystem = (store: Store) => {
  handleFunc(SystemApi, 'getPythonInterpreters');
  handleFunc(SystemApi, 'fileSelect');
};
