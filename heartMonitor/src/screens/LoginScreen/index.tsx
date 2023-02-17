import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";

import Colors from "../../ref/Colors";
import { apiendpoint } from "../../components/utils/apiendpoint";

const LoginScreen = (props: any) => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = async () => {
    const body = {
      query: {
        work_mail: email
      },
      user: {
        name,
        avatar: "",
        work_mail: email,
        phone,
        password
      }
    };
    console.log(JSON.stringify(body, null, 2));
    fetch(`${apiendpoint}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) return res.json();
        else throw new Error("Unauthorized");
      })
      .then((json) => {
        console.log(json.data);
        const saveJWT = async () => {
          await AsyncStorage.setItem("jwt", json.data.token);
        };
        saveJWT();
        props.navigation.navigate("Monitor");
      })
      .catch(console.log);
    props.navigation.navigate("Monitor");
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.Background,
        flex: 1
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center", marginTop: 60 }}>
        <Image source={require("../../ref/loader.png")} />
      </View>
      <View style={{ marginTop: 60 }}>
        <Text
          style={{
            color: Colors.Theme,
            fontStyle: "normal",
            fontWeight: "500",
            fontSize: 30,
            letterSpacing: 0.05,
            marginLeft: 40
          }}
        >
          Welcome Back!
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 30,
          marginTop: 20,
          marginBottom: 0,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: Colors.Text,
          paddingLeft: 20
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: Colors.Text
          }}
          value={name}
          placeholder="Name"
          cursorColor={Colors.Text}
          selectionColor={Colors.Text}
          placeholderTextColor={Colors.Text}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 30,
          marginTop: 20,
          marginBottom: 0,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: Colors.Text,
          paddingLeft: 20
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: Colors.Text
          }}
          value={email}
          placeholder="Email"
          cursorColor={Colors.Text}
          selectionColor={Colors.Text}
          placeholderTextColor={Colors.Text}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 30,
          marginTop: 20,
          marginBottom: 0,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: Colors.Text,
          paddingLeft: 20
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: Colors.Text
          }}
          value={phone}
          placeholder="Phone Number"
          cursorColor={Colors.Text}
          selectionColor={Colors.Text}
          placeholderTextColor={Colors.Text}
          onChangeText={(text) => setPhone(text)}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          margin: 30,
          marginTop: 20,
          marginBottom: 0,
          borderRadius: 100,
          borderWidth: 2,
          borderColor: Colors.Text,
          paddingLeft: 20
        }}
      >
        <TextInput
          style={{
            flex: 1,
            color: Colors.Text
          }}
          value={password}
          placeholder="Password"
          cursorColor={Colors.Text}
          selectionColor={Colors.Text}
          placeholderTextColor={Colors.Text}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          margin: 30,
          marginTop: 60,
          marginBottom: 0,
          justifyContent: "flex-end"
        }}
        onPress={login}
      >
        <View
          style={{
            backgroundColor: Colors.Accent,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 100
          }}
        >
          <Text style={{ color: Colors.Text }}>Login</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
