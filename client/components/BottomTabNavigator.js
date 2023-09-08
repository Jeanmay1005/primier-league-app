import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TouchableOpacity, Text, Button } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import React from "react";

import NewsScreen from "../components/NewsScreen";
import StandingScreen from "./StandingScreen";
import FavoriteScreen from "./FavoriteScreen";

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = "Home";
export default function BottomTabNavigator({ route, navigation }) {
  const email = route.params;
  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#35183D",
        },
        headerTintColor: "#fff",

        headerRight: () => {
          return (
            <TouchableOpacity onPress={() => navigation.navigate("Landing")}>
              <Text style={{ color: "#fff", padding: 15, fontWeight: "bold" }}>
                Log out
              </Text>
            </TouchableOpacity>
          );
        },
      }}
    >
      <BottomTab.Screen
        name="News"
        component={NewsScreen}
        options={{
          tabBarIcon: () => {
            return (
              <Icon name="newspaper-o" size={20} stye={{ color: "grey" }} />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Standings"
        component={StandingScreen}
        initialParams={{ email: route.params }}
        options={{
          tabBarIcon: () => {
            return <Icon name="trophy" size={20} stye={{ color: "grey" }} />;
          },
        }}
      />
      <BottomTab.Screen
        name="Favorite"
        component={FavoriteScreen}
        initialParams={{ email: route.params }}
        options={{
          tabBarIcon: () => {
            return <Icon name="heart" size={20} stye={{ color: "grey" }} />;
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
