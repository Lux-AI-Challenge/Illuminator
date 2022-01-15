import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';

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
