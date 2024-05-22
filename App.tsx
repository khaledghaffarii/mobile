import React from "react";
import { AppNavigator } from "./navigation/AppNavigator";
import { CartProvider } from "./context/CartContext";
import { NavigationContainer } from "@react-navigation/native";

const App: React.FC = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
