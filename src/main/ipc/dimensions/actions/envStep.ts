import { EpisodeResult } from 'dimensions-ai-temp/lib/main/Episode';
import { Context } from 'main/ipc/dimensions/context';
import type { Action } from 'main/ipc/types';

interface Data {
  episodeId: string;
}

type Result = { results: EpisodeResult; done: boolean };

/**
 * Steps forward in parallel an ongoing episode and returns the results as well as if its done or not.
 * If episode is done, will self close the episode and the corresponding agents
 *
 */
export const envStep: Action<Data, Result, Context> =
  (ctx) => async (_event, data) => {
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
