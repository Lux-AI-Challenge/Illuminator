export interface UserPreferences {
  env: string;
  mostRecentEnvs: string[];
  pythonInterpreter: string;
}

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  env: '',
  mostRecentEnvs: [],
  pythonInterpreter: 'python',
};
