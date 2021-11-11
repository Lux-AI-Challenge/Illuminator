import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import { handleFunc } from '../wrapper';
import * as pipeline from './pipeline';

export const setupDimensions = (store: Store) => {
  const dim = new Dimension();
  pipeline.setup(dim, store);

  /**
   * Atomic replica functions
   * TODO: automate the generation of these?
   */

  handleFunc<Dimensions.Actions['MakeEnv']>(
    'dim_makeEnv',
    async (_event, data) => {
      const env = await dim.makeEnv(data.env);
      const out = {
        name: env.name ?? '',
        id: env.id,
      };
      return out;
    }
  );

  handleFunc<Dimensions.Actions['RunEpisode']>(
    'dim_runEpisode',
    async (_event, data) => {
      const env = Environment.envmap.get(data.id);
      if (env) {
        const eps = await dim.runEpisode(env, data.agents);
        return eps.results;
      }
      throw Error(`Environment with id ${data.id} not found!`);
    }
  );

  handleFunc<$TSFIXME>('dim_closeEnv', async (_event, data) => {
    const env = Environment.envmap.get(data.id);
    if (env) {
      await env.close();
    } else {
      throw Error(`Environment with id ${data.id} not found!`);
    }
  });
};
