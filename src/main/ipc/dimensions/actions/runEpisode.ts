import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import type { Action } from 'main/ipc/types';
import type { Context } from '../context';

export const runEpisode: Action<
  {
    id: string;
    agents: string[];
  },
  $TSFIXME,
  Context
> = (ctx) => async (_event, data) => {
  const env = Environment.envmap.get(data.id);
  if (env) {
    const eps = await ctx.dim.runEpisode(env, data.agents);
    return eps.results;
  }
  throw Error(`Environment with id ${data.id} not found!`);
};
