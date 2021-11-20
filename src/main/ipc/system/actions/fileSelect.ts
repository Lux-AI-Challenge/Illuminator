import { dialog } from 'electron';
import type { Action } from 'main/ipc/types';

export type Data = Electron.OpenDialogOptions;

export type Result = string | undefined;

export const fileSelect: Action<Data, Result> = () => async (_event, data) => {
  const { filePaths } = await dialog.showOpenDialog(data);
  return filePaths?.[0];
};
