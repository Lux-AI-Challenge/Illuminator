declare namespace User {
  interface Actions {
    GetPreferences: {
      in: void;
      out: UserPreferences;
    };
    SetPreferences: {
      in: DeepPartial<UserPreferences>;
      out: UserPreferences;
    };
  }

  interface UserPreferences {
    env: string;
    mostRecentEnvs: string[];
    pythonInterpreter: string;
  }
}
