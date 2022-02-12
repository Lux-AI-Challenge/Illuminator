import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import type { Action } from 'main/ipc/types';
import type { Context } from '../context';

export const runSingleEpisode: Action<
  {
    env: string;
    agents: string[];
    seed?: number;
  },
  $TSFIXME,
  Context
> = (ctx) => async (_event, data) => {
  let env: Environment | null = null;
  try {
    env = await ctx.dim.makeEnv(data.env);
    ctx.store.set('store_user_preferences', data.env);
    const eps = await ctx.dim.runEpisode(env, data.agents);
    return eps.results;
  } finally {
    if (env) env.close();
  }
};
