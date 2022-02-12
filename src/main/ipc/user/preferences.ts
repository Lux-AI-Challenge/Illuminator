export interface UserPreferences {
  env: string;
  mostRecentEnvs: string[];
  pythonInterpreter: string;
  agents: string[];
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  env: '',
  mostRecentEnvs: [],
  pythonInterpreter: 'python',
  agents: [],
};
