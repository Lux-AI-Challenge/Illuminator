/**
 * Pipelined set of functionalities that combine several functions together
 */

import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import { handleFunc } from '../wrapper';

export const setup = (dim: Dimension, store: Store) => {
  /**
   * Auxillary
   */
  handleFunc<Dimensions.Actions['RunSingleEpisode']>(
    'dim_RunSingleEpisode',
    async (_event, data) => {
      let env: Environment | null = null;
      try {
        env = await dim.makeEnv(data.env);
        store.set('store_user_preferences', data.env);
        const eps = await dim.runEpisode(env, data.agents);
        return eps.results;
      } finally {
        if (env) env.close();
      }
    }
  );
};
