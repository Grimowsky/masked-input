import React from 'react';

function createStatelessContext<TValue>() {
  const context = React.createContext<TValue | undefined>(undefined);

  function useContext() {
    const contextValue = React.useContext(context);

    if (!contextValue) {
      throw new Error('useContext must be inside a provider with a value');
    }

    return contextValue;
  }

  return [useContext, context.Provider] as const;
}

export { createStatelessContext };
