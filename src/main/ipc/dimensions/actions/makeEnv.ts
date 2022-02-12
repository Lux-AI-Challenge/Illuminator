import type { Action } from 'main/ipc/types';
import type { Context } from '../context';
import { getEnv } from '../envScheduler';

export const makeEnv: Action<
  {
    env: string;
  },
  {
    name: string;
    id: string;
    metaData: $TSFIXME;
  },
  Context
> = (ctx) => async (_event, data) => {
  // TODO, maybe some clustering / scheduling to determine whihc env to give back
  const env = await getEnv(data.env, ctx);
  const out = {
    name: env.configs.name ?? '',
    id: env.id,
    metaData: env.metaData,
  };

  return out;
};
