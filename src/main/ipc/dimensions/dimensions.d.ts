declare namespace Dimensions {
  type Name = 'dim';
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
    CloseEnv: {
      in: {
        id: string;
      };
      out: void;
    };
  }
}
