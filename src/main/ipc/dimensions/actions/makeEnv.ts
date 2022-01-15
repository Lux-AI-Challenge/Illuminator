import { Context } from 'main/ipc/dimensions/context';
import type { Action } from 'main/ipc/types';

interface Data {
  env: string;
}

type Result = {
  name: string;
  id: string;
  metaData: any;
};

export const makeEnv: Action<Data, Result, Context> =
  (ctx) => async (_event, data) => {
    // TODO, maybe some clustering / scheduling to determine whihc env to give back
    const { envs } = ctx.data;
    // console.log({ ctx });
    let env = envs.get(data.env);
    if (env) {
      console.log('FREE ENV EXISTS ALREADY, REUSUING', env.id);
    } else {
      console.log('CREATING ENV', data.env);
      env = await ctx.dim.makeEnv(data.env);
      ctx.data.envs.set(data.env, env);
    }
    const out = {
      name: env.configs.name ?? '',
      id: env.id,
      metaData: env.metaData,
    };

    return out;
  };
