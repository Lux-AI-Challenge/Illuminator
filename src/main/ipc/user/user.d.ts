declare namespace User {
  interface Actions {
    GetPreferences: {
      in: void;
      out: UserPreferences;
    };
  }

  interface UserPreferences {
    env: string;
    pythonInterpreter: string;
  }
}
