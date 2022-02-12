import type { Agent } from 'dimensions-ai-temp/lib/main/Agent';
import type { Action } from 'main/ipc/types';
import type { Context } from '../context';

export const initializeAgents: Action<
  {
    agentPaths: string[];
  },
  {
    agentIds: string[];
  },
  Context
> = (ctx) => async (_event, data) => {
  const tempAgentIDs: Set<string> = new Set();
  const runAgents: Agent[] = [];
  data.agentPaths.forEach((agent) => {
    const newAgent = ctx.dim.addAgent({ agent });
    tempAgentIDs.add(newAgent.id);
    runAgents.push(newAgent);
  });
  return {
    agentIds: runAgents.map((a) => a.id),
  };
};
