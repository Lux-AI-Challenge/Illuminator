import { EpisodeResult } from 'dimensions-ai-temp/lib/main/Episode';
import { Context } from 'main/ipc/dimensions/context';
import type { Action } from 'main/ipc/types';

interface Data {
  episodeId: string;
}

type Result = { results: EpisodeResult; done: boolean };

export const envStep: Action<Data, Result, Context> =
  (ctx) => async (_event, data) => {
    const { episodes } = ctx.data;
    const episode = episodes.get(data.episodeId);
    console.log('HERE');
    if (episode) {
      console.log('HERE2');
      const done = await episode.stepParallel();
      return { results: episode.results, done };
    }
    throw Error(`Episode with id ${data.episodeId} not found!`);
  };
