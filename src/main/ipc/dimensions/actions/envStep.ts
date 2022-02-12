import { EpisodeResult } from 'dimensions-ai-temp/lib/main/Episode';
import type { Action } from 'main/ipc/types';
import type { Context } from '../context';

/**
 * Steps forward in parallel an ongoing episode and returns the results as well as if its done or not.
 * If episode is done, will self close the episode and the corresponding agents
 *
 */
export const envStep: Action<
  { episodeId: string },
  { results: EpisodeResult; done: boolean },
  Context
> = (ctx) => async (_event, data) => {
  const { episodes } = ctx.data;
  const episode = episodes.get(data.episodeId);
  if (episode) {
    const done = await episode.stepParallel();
    if (done) {
      // clean up
      await episode.close();
    }
    return { results: episode.results, done };
  }
  throw Error(`Episode with id ${data.episodeId} not found!`);
};
