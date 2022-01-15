import type { Action } from 'main/ipc/types';
import fs from 'fs';

export type Data = string;

export type Result = string | undefined;

export const readFile: Action<Data, Result> = () => async (_event, data) => {
  const filedata = fs.readFileSync(data);
  return `${filedata}`;
};
