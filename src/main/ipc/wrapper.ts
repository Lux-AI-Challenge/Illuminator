import { ipcMain, ipcRenderer } from 'electron';
import type { AbstractApi, Message, Payload } from './types';

/**
 * lightweight wrapper for `ipcRenderer.invoke` to provide typing
 * @param message the function to invoke. this should be autocompleted
 * @param data the data to pass into the function
 * @returns the result of the function
 */
export const invokeFunc = <T extends AbstractApi, K extends keyof T['actions']>(
  message: Message<T, K>,
  data: Payload<T, K>
) => ipcRenderer.invoke(message, data);

/// this stuff can basically autogenerate the preload functions
/// but results in a very bulky preload script since it needs access to the actual api object
/// which means all the dependencies get bundled in
//
// const messageName = <T extends AbstractApi>(
//   api: T,
//   action: keyof T['actions']
// ): Message<T> => `${api.prefix}_${action}`;
//
// /**
//  * wrapper for `ipcRenderer.invoke` to provide typing
//  * @param api the api to call
//  * @param action the string name of the function to call on the api
//  * @param data the data to send to the function
//  * @returns the result of the api call
//  */
// export const invokeFunc = <T extends AbstractApi, K extends keyof T['actions']>(
//   api: T,
//   action: K & string,
//   data: Payload<T, K>
// ): Response<T, K> => {
//   return ipcRenderer.invoke(messageName(api, action), data) as Response<T, K>;
// };
//
// /**
//  * extracts the handlers for an api
//  */
// export const extractHandlers = <T extends AbstractApi>(api: T): Handlers<T> => {
//   const handlers = {} as Handlers<T>;
//
//   Object.keys(api.actions).forEach((action) => {
//     handlers[action as keyof T['actions']] = (data) =>
//       invokeFunc<T, typeof action>(api, action, data);
//   });
//
//   return handlers;
// };
//
///

/**
 * Wraps try catch around to return errors to renderer instead of the main process
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleFunc = async <
  T extends AbstractApi,
  K extends keyof T['actions']
>(
  api: T,
  action: K & string,
  ctx: Parameters<T['actions'][K]>[0]
) => {
  const func = `${api.prefix}_${action}`;
  const oldcb = api.actions[action](ctx);
  const newcb: typeof oldcb = async (event, ...data) => {
    try {
      return await oldcb(event, ...data);
    } catch (err) {
      return err as typeof oldcb;
    }
  };
  ipcMain.handle(func, newcb);
};
