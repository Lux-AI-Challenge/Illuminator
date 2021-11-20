import type { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import type { Action } from 'main/ipc/types';

interface Context {
  dim: Dimension;
}

interface Data {
  env: string;
}

type Result = {
  name: string;
  id: string;
};

export const makeEnv: Action<Data, Result, Context> =
  (ctx) => async (_event, data) => {
    const env = await ctx.dim.makeEnv(data.env);
    const out = {
      name: env.configs.name ?? '',
      id: env.id,
    };
    return out;
  };
