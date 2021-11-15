import type { IpcMainInvokeEvent } from 'electron';

export type Action<Data = any, Result = any, Context = any> = (
  ctx: Context
) => (_event: IpcMainInvokeEvent, data: Data) => Promise<Result>;

export interface MainProcessApi {
  prefix: string;
  actions: Record<string, Action>;
}

export type Message<
  T extends MainProcessApi,
  K = keyof T['actions']
> = `${T['prefix']}_${K & string}`;

export type Payload<
  T extends MainProcessApi,
  K extends keyof T['actions']
> = Parameters<ReturnType<T['actions'][K]>>[1];

export type Response<
  T extends MainProcessApi,
  K extends keyof T['actions']
> = ReturnType<ReturnType<T['actions'][K]>>;

export type Handlers<T extends MainProcessApi> = {
  [K in keyof T['actions']]: (data: Payload<T, K>) => Response<T, K>;
};
