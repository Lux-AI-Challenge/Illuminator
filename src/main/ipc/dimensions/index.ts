import { Context } from 'main/ipc/dimensions/context';
import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { handleFunc } from '../wrapper';
import DimensionsApi from './dimensions';

export const setupDimensions = (store: Store) => {
  const dim = new Dimension();
  // pipeline.setup(dim, store);
  // context lives in memory only
  const ctx: Context = {
    dim,
    data: { envs: new Map(), envNameToEnvs: new Map(), episodes: new Map() },
    store,
  };
  handleFunc(DimensionsApi, 'makeEnv', ctx);
  handleFunc(DimensionsApi, 'closeEnv');
  handleFunc(DimensionsApi, 'runEpisode', ctx);
  handleFunc(DimensionsApi, 'initializeAgents', ctx);
  handleFunc(DimensionsApi, 'envRegisterAgents');
  handleFunc(DimensionsApi, 'envStep', ctx);
  handleFunc(DimensionsApi, 'createEpisode', ctx);
};
