import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import type { Action } from 'main/ipc/types';

export const envRegisterAgents: Action<
  {
    envId: string;
    agentIds: string[];
  },
  void
> = () => async (_event, data) => {
  const env = Environment.envmap.get(data.envId);
  if (env) {
    await env.registerAgents(data.agentIds);
  } else {
    throw Error(`Environment with id ${data.envId} not found!`);
  }
};
