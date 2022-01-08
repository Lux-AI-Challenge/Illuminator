import type { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import { Context } from 'main/ipc/dimensions';
import type { Action } from 'main/ipc/types';

interface Data {
  env: string;
  agents: string[];
  seed?: number;
}

type Result = $TSFIXME;

export const runSingleEpisode: Action<Data, Result, Context> =
  (ctx) => async (_event, data) => {
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
