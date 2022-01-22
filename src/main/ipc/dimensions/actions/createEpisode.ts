import { Context } from 'main/ipc/dimensions/context';
import type { Action } from 'main/ipc/types';
import { getEnv } from '../envScheduler';

interface Data {
  env: string;
  agents: string[];
}

type Result = {
  episodeId: string;
  env: string;
  metaData: $TSFIXME;
  name: string;
};

export const createEpisode: Action<Data, Result, Context> =
  (ctx) => async (_event, data) => {
    const env = await getEnv(data.env, ctx);
    const { episodes } = ctx.data;
    const episode = await ctx.dim.createEpisode(env, data.agents);
    await episode.initialize();
    episodes.set(episode.id, episode);
    return {
      episodeId: episode.id,
      env: data.env,
      metaData: env.metaData,
      name: env.configs.name ?? '',
    };
  };
