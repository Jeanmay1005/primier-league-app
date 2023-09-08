import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { RegisterApi } from "../api/RegisterApi";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

async function Register(email, password) {
  let data = await RegisterApi(email, password);
  if (data["error"] === undefined) {
    console.log("register successful");
    return { success: true, message: data };
  }
  console.log("register fail");
  return { success: false, message: data };
}

export default function App({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerMessage, setRegisterMessage] = useState("");
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require("./assets/log2.png")} />  */}
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email."
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={async () => {
          const registerResult = await Register(email, password);
          if (registerResult.success) {
            navigation.navigate("Login");
          } else {
            setRegisterMessage(registerResult.message.message);
          }
        }}
      >
        <Text style={styles.loginText}>REGISTER</Text>
      </TouchableOpacity>
      <Text style={{ color: "#fff" }}>{registerMessage}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: "#fff",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#787DCA",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
