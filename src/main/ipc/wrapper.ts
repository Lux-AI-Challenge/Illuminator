import { ipcMain, IpcMainInvokeEvent } from 'electron';

/**
 * Wraps try catch around to return errors to renderer instead of the main process
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleFunc = async <T extends Record<string, any>>(
  func: string,
  cb: (event: IpcMainInvokeEvent, data: T['in']) => Promise<T['out']>
) => {
  const oldcb = cb;
  const newcb = async (event: IpcMainInvokeEvent, data: T['in']) => {
    try {
      return await oldcb(event, data);
    } catch (err) {
      return err as T['out'];
    }
  };
  ipcMain.handle(func, newcb);
};
