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
    IntializeAgents: {
      in: {
        agentPaths: string[];
      };
      out: {
        agentIds: string[];
      };
    };
    EnvRegisterAgents: {
      in: {
        envId: string;
        agentIds: string[];
      };
      out: void;
    };
    /**
     * Step through environment with the given agent Ids.
     */
    EnvStepWithAgents: {
      in: {
        agentIds: string[];
        envId: string;
      };
      out: $TSFIXME; // env return state;
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
