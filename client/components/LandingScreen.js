import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import logo from "../assets/landing_logo.png/";
export default function LandingScreen({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.homePageContainer}
      onPress={() => navigation.navigate("Login")}
    >
      <Image source={logo} />
      <Text style={{ fontSize: 30, color: "#fff" }}>Be in the Game</Text>
      <Text style={{ fontSize: 15, padding: 15, color: "#fff" }}>
        Click anywhere to start
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  homePageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {},
});
