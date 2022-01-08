import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { handleFunc } from '../wrapper';
import * as pipeline from './pipeline';
import DimensionsApi from './dimensions';

export interface Context {
  dim: Dimension;
  store: Store;
  data: {
    // TODO: map from env file path to list of environments and their IDs
    // TODO: map env name as well to the same stuff
    envs: Map<string, Environment>;
    envNameToEnvs: Map<string, Environment>;
  };
}

export const setupDimensions = (store: Store) => {
  const dim = new Dimension();
  pipeline.setup(dim, store);
  const ctx = {
    dim,
    data: { envs: new Map(), envNameToEnvs: new Map() },
    store,
  };
  handleFunc(DimensionsApi, 'makeEnv', ctx);
  handleFunc(DimensionsApi, 'closeEnv');
  handleFunc(DimensionsApi, 'runEpisode', ctx);
  handleFunc(DimensionsApi, 'initializeAgents', ctx);
  handleFunc(DimensionsApi, 'envRegisterAgents');
};
