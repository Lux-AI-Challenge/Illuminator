import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import type { Action } from 'main/ipc/types';

interface Data {
  envId: string;
  agentIds: string[];
}
type Result = void;

export const envRegisterAgents: Action<Data, Result> =
  () => async (_event, data) => {
    const env = Environment.envmap.get(data.envId);
    if (env) {
      await env.registerAgents(data.agentIds);
    } else {
      throw Error(`Environment with id ${data.envId} not found!`);
    }
  };
