import { StyleSheet, Text, View } from "react-native";

import BottomTabNavigator from "./components/BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LandingScreen from "./components/LandingScreen";
import TeamInfoScreen from "./components/TeamInfoScreen";
import LoginScreen from "./components/LoginScreen";
import RegisterScreen from "./components/RegisterScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
            cardStyle: { backgroundColor: "#35183D" },
          }}
          name="Landing"
          component={LandingScreen}
        />
        <Stack.Screen
          options={{
            cardStyle: { backgroundColor: "#35183D" },
            headerStyle: {
              backgroundColor: "#35183D",
            },
            headerTintColor: "#fff",
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            cardStyle: { backgroundColor: "#35183D" },
            headerStyle: {
              backgroundColor: "#35183D",
            },
            headerTintColor: "#fff",
          }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Team"
          component={TeamInfoScreen}
          options={{
            headerStyle: {
              backgroundColor: "#35183D",
            },
            headerTintColor: "#fff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
