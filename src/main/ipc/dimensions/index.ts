import { Context } from 'main/ipc/dimensions/context';
import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { handleFunc } from '../wrapper';
import * as pipeline from './pipeline';
import DimensionsApi from './dimensions';

export const setupDimensions = (store: Store) => {
  const dim = new Dimension();
  pipeline.setup(dim, store);
  const ctx: Context = {
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
