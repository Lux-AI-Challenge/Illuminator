import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import type { Action } from 'main/ipc/types';

export const closeEnv: Action<{ id: string }, void> =
  () => async (_event, data) => {
    const env = Environment.envmap.get(data.id);
    if (env) {
      await env.close();
    } else {
      throw Error(`Environment with id ${data.id} not found!`);
    }
  };
