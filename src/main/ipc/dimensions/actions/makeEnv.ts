import { Context } from 'main/ipc/dimensions/context';
import type { Action } from 'main/ipc/types';
import { getEnv } from '../envScheduler';

interface Data {
  env: string;
}

type Result = {
  name: string;
  id: string;
  metaData: $TSFIXME;
};

export const makeEnv: Action<Data, Result, Context> =
  (ctx) => async (_event, data) => {
    // TODO, maybe some clustering / scheduling to determine whihc env to give back
    const env = await getEnv(data.env, ctx);
    const out = {
      name: env.configs.name ?? '',
      id: env.id,
      metaData: env.metaData,
    };

    return out;
  };
