export const runSingleEpisode = async (
  env: string,
  agents: string[],
  seed = 0
) => {
  // return new Promise((res, rej) => {
  const pyagent =
    '/Users/stonetao/Desktop/Coding/Projects/aicompetitions/dimensions/tests/envs/rps/agents/agent.py';
  const jsagent =
    '/Users/stonetao/Desktop/Coding/Projects/aicompetitions/dimensions/tests/envs/rps/agents/paper.js';
  // agents = ;
  console.log({ env });
  // env = '/Users/stonetao/Desktop/Coding/Projects/aicompetitions/dimensions/tests/envs/rps/enva.py';
  console.log({ agents });
  return window.electron.dimensions.RunSingleEpisode({
    env,
    agents: [pyagent, jsagent],
    seed,
  });
};
