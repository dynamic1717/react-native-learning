import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "./src/screens/Home.page";
import { ImageShare } from "./src/screens/ImageShare.page";
import { Game } from "./src/screens/Game.page";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        // screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ImageShare" component={ImageShare} />
        <Stack.Screen name="Game" component={Game} />
      </Stack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
