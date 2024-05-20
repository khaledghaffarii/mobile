import React, { createContext, useContext, useState } from "react";

// Définir le type de l'état global ici
interface AppState {
  // Propriétés de l'état global
}

interface AppContextProps {
  // Définir les méthodes et états ici
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AppState | null>(/* Initial state here */);

  const contextValue: AppContextProps = {
    // Définir les méthodes et états ici
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export { AppContextProvider, useAppContext };
