/**
 * Pipelined set of functionalities that combine several functions together
 */

import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import { handleDimFunc } from './wrapper';

export const setup = (dim: Dimension) => {
  /**
   * Auxillary
   */
  handleDimFunc(
    'runSingleEpisode',
    async (_event, data: RunSingleEpisodeIn) => {
      let env: Environment | null = null;
      try {
        env = await dim.makeEnv(data.env);
        const eps = await dim.runEpisode(env, data.agents);
        return eps.results;
      } finally {
        if (env) env.close();
      }
    }
  );
};
