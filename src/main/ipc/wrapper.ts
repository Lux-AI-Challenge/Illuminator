import { ipcMain, ipcRenderer } from 'electron';
import type { MainProcessApi, Message, Payload } from './types';

/**
 * lightweight wrapper for `ipcRenderer.invoke` to provide typing
 * @param message the function to invoke. this should be autocompleted
 * @param data the data to pass into the function
 * @returns the result of the function
 */
export const invokeFunc = <
  T extends MainProcessApi,
  K extends keyof T['actions']
>(
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
 * black magic sorcery that, given a function `f(...args, optionalArg: T) => res`,
 * allows the function to be invoked as either `f(...args)` or `f(...args, Default)` when `T` is of type Optional.
 * if used, `f` must be typed as `(...args, ...[optionalArg]: OptionalArg<T, Optional, Default>) => res`.
 * JSDoc comments become less useful when using this type, though, since the argname gets mangled
 */
type OptionalArg<
  T,
  Optional = undefined & void & never,
  Default = undefined
> = (T extends Optional ? [] | [Default] : [T]) extends [infer L]
  ? [L]
  : [] | [Default];

/**
 * Wraps try catch around to return errors to renderer instead of the main process
 *
 * @todo types are very ugly. dunno if theres a better way to do this that avoids having to explicitly specify the generic types while getting all the proper type hinting
 */
export const handleFunc = async <
  T = MainProcessApi,
  K = T extends MainProcessApi ? keyof T['actions'] : never
>(
  api: T extends MainProcessApi ? T : never,
  action: T extends MainProcessApi
    ? (K extends keyof T['actions'] ? K : keyof typeof api['actions']) & string
    : never,
  ...[ctx]: OptionalArg<
    T extends MainProcessApi
      ? Parameters<T['actions'][typeof action]>[0]
      : never
  >
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
