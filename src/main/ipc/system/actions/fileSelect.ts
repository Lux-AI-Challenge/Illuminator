import { dialog } from 'electron';
import type { Action } from 'main/ipc/types';

export const fileSelect: Action<
  Electron.OpenDialogOptions,
  string | undefined
> = () => async (_event, data) => {
  const { filePaths } = await dialog.showOpenDialog(data);
  return filePaths?.[0];
};
