import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      {/*
      <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    </Stack.Navigator>
  );
};

export { AppNavigator };
