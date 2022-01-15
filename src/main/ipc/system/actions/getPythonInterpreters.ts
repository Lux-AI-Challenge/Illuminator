import type { Action } from 'main/ipc/types';

export type Data = void;

export type Result = string[];

export const getPythonInterpreters: Action<Data, Result> = () => async () => {
  // execSync('')
  // TODO:
  return [];
};
