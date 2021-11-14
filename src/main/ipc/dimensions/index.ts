import { Dimension } from 'dimensions-ai-temp/lib/main/Dimension';
import { Environment } from 'dimensions-ai-temp/lib/main/Environment';
import { Agent } from 'dimensions-ai-temp/lib/main/Agent';
import { Engine } from 'dimensions-ai-temp/lib/main/Engine';
import { handleFunc } from '../wrapper';
import * as pipeline from './pipeline';

export const setupDimensions = (store: Store) => {
  const dim = new Dimension();
  pipeline.setup(dim, store);

  /**
   * Atomic replica functions
   * TODO: automate the generation of these?
   */

  handleFunc<Dimensions.Actions, 'MakeEnv'>(
    'dim_MakeEnv',
    async (_event, data) => {
      const env = await dim.makeEnv(data.env);
      const out = {
        name: env.configs.name ?? '',
        id: env.id,
      };
      return out;
    }
  );

  handleFunc<Dimensions.Actions, 'RunEpisode'>(
    'dim_RunEpisode',
    async (_event, data) => {
      const env = Environment.envmap.get(data.id);
      if (env) {
        const eps = await dim.runEpisode(env, data.agents);
        return eps.results;
      }
      throw Error(`Environment with id ${data.id} not found!`);
    }
  );

  handleFunc<Dimensions.Actions, 'IntializeAgents'>(
    'dim_IntializeAgents',
    async (_event, data) => {
      const tempAgentIDs: Set<string> = new Set();
      const runAgents: Agent[] = [];
      data.agentPaths.forEach((agent) => {
        const newAgent = dim.addAgent({ agent });
        tempAgentIDs.add(newAgent.id);
        runAgents.push(newAgent);
      });
      return {
        agentIds: runAgents.map((a) => a.id),
      };
    }
  );

  handleFunc<Dimensions.Actions, 'EnvRegisterAgents'>(
    'dim_EnvRegisterAgents',
    async (_event, data) => {
      const env = Environment.envmap.get(data.envId);
      if (env) {
        await env.registerAgents(data.agentIds);
      } else {
        throw Error(`Environment with id ${data.envId} not found!`);
      }
    }
  );

  handleFunc<Dimensions.Actions, 'CloseEnv'>(
    'dim_CloseEnv',
    async (_event, data) => {
      const env = Environment.envmap.get(data.id);
      if (env) {
        await env.close();
      } else {
        throw Error(`Environment with id ${data.id} not found!`);
      }
    }
  );
};
