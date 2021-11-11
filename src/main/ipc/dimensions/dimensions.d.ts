declare namespace Dimensions {
  interface Actions {
    MakeEnv: {
      in: {
        env: string;
      };
      out: {
        name: string;
        id: string;
      };
    };
    RunEpisode: {
      in: {
        /** id of env */
        id: string;
        agents: string[];
      };
      out: $TSFIXME;
    };
    RunSingleEpisode: {
      in: {
        env: string;
        agents: string[];
        seed?: number;
      };
      out: {
        final: $TSFIXME;
      };
    };
  }
}
