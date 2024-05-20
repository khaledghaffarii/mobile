import React from "react";
import { AppNavigator } from "../navigation/AppNavigator";
import { AppContextProvider } from "../context/AppContext";
import { NavigationContainer } from "@react-navigation/native";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AppContextProvider>
        <AppNavigator />
      </AppContextProvider>
    </NavigationContainer>
  );
};

export default App;
