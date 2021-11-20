import type { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import type { Action } from 'main/ipc/types';

interface Context {
  dim: Dimension;
}

interface Data {
  id: string;
  agents: string[];
}

type Result = $TSFIXME;

export const runEpisode: Action<Data, Result, Context> =
  (ctx) => async (_event, data) => {
    const env = Environment.envmap.get(data.id);
    if (env) {
      const eps = await ctx.dim.runEpisode(env, data.agents);
      return eps.results;
    }
    throw Error(`Environment with id ${data.id} not found!`);
  };
