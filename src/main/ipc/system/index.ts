import { handleFunc } from '../wrapper';
import SystemApi from './system';

export const setupSystem = () => {
  handleFunc(SystemApi, 'getPythonInterpreters');
  handleFunc(SystemApi, 'fileSelect');
  handleFunc(SystemApi, 'readFile');
};
