import { ipcMain, IpcMainInvokeEvent } from 'electron';

/**
 * Wraps try catch around to return errors to renderer instead of the main process
 */
export const handleDimFunc = async <T, K>(
  func: string,
  cb: (event: IpcMainInvokeEvent, data: T) => Promise<K>
) => {
  const oldcb = cb;
  const newcb = async (event: IpcMainInvokeEvent, data: T) => {
    try {
      return await oldcb(event, data);
    } catch (err) {
      return err as K;
    }
  };
  ipcMain.handle(`dim_${func}`, newcb);
};
