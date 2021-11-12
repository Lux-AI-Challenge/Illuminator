declare namespace System {
  interface Actions {
    GetPythonInterpreters: {
      in: void;
      out: string[];
    };
  }
}
