export interface UserPreferences {
  /**
   * The env used last time
   */
  env: string;
  /**
   * TODO
   */
  mostRecentEnvs: string[];
  /**
   * The python command used to run the environments
   */
  pythonInterpreter: string;
  /**
   * Most recent selection of agents for single match running
   */
  agents: string[];
  /**
   * Most recent selection of tournament agents
   */
  tournamentAgents: string[];
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  env: '',
  mostRecentEnvs: [],
  pythonInterpreter: 'python',
  agents: [],
  tournamentAgents: [],
};
