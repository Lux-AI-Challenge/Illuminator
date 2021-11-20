import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { handleFunc } from '../wrapper';
import * as pipeline from './pipeline';
import DimensionsApi from './dimensions';

export const setupDimensions = (store: Store) => {
  const dim = new Dimension();
  pipeline.setup(dim, store);

  handleFunc(DimensionsApi, 'makeEnv', { dim });
  handleFunc(DimensionsApi, 'closeEnv');
  handleFunc(DimensionsApi, 'runEpisode', { dim });
  handleFunc(DimensionsApi, 'initializeAgents', { dim });
  handleFunc(DimensionsApi, 'envRegisterAgents');
};
