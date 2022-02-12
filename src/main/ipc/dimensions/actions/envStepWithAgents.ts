import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import type { Action } from 'main/ipc/types';

/**
 * TODO
 * Step through environment with the given agent Ids.
 */
export const envStepWithAgents: Action<
  {
    envId: string;
    agentIds: string[];
  },
  $TSFIXME
> = () => async (_event, data) => {
  const env = Environment.envmap.get(data.envId);
  if (env) {
    // TODO
  } else {
    throw Error(`Environment with id ${data.envId} not found!`);
  }
};
