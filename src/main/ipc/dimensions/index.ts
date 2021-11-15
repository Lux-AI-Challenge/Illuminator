import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { handleFunc } from '../wrapper';
import * as pipeline from './pipeline';
import DimensionsApi, { Dimensions } from './dimensions';

export const setupDimensions = (store: Store) => {
  const dim = new Dimension();
  pipeline.setup(dim, store);

  handleFunc<Dimensions, 'makeEnv'>(DimensionsApi, 'makeEnv', { dim });
  handleFunc<Dimensions, 'closeEnv'>(DimensionsApi, 'closeEnv', undefined);
  handleFunc<Dimensions, 'runEpisode'>(DimensionsApi, 'runEpisode', { dim });
  handleFunc<Dimensions, 'initializeAgents'>(
    DimensionsApi,
    'initializeAgents',
    {
      dim,
    }
  );
};
