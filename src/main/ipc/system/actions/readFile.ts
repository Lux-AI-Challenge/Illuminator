import type { Action } from 'main/ipc/types';
import fs from 'fs';

export const readFile: Action<string, string> = () => async (_event, data) => {
  const filedata = fs.readFileSync(data);
  return `${filedata}`;
};
