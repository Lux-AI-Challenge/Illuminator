import React from 'react';

// set UserContext and add type
const EnvContext = React.createContext(
  {} as {
    env: string;
    setEnv: (env: string) => any;
  }
);

export const EnvProvider = EnvContext.Provider;
export const EnvConsumer = EnvContext.Consumer;
export default EnvContext;
