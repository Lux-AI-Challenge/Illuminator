import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import { handleDimFunc } from './wrapper';
import * as pipeline from './pipeline';

export const setupDimensions = () => {
  const dim = new Dimension();
  pipeline.setup(dim);

  /**
   * Atomic replica functions
   * TODO: automate the generation of these?
   */

  handleDimFunc('makeEnv', async (_event, data: MakeEnvIn) => {
    const env = await dim.makeEnv(data.env);
    const out: MakeEnvRet = {
      name: env.name ?? '',
      id: env.id,
    };
    return out;
  });

  handleDimFunc('runEpisode', async (_event, data: RunEpisodeIn) => {
    const env = Environment.envmap.get(data.id);
    if (env) {
      const eps = await dim.runEpisode(env, data.agents);
      return eps.results;
    }
    throw Error(`Environment with id ${data.id} not found!`);
  });

  handleDimFunc('closeEnv', async (_event, data: RunEpisodeIn) => {
    const env = Environment.envmap.get(data.id);
    if (env) {
      await env.close();
    } else {
      throw Error(`Environment with id ${data.id} not found!`);
    }
  });
};
