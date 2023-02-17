import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Colors from "../../ref/Colors";

const SplashScreen = (props: any) => {
  React.useEffect(() => {
    setTimeout(async () => {
      const jwt = await AsyncStorage.getItem("jwt");
      if (!jwt) props.navigation.navigate("Login");
      else props.navigation.navigate("Monitor");
    }, 2500);
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.Background,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <View>
        <Image source={require("../../ref/loader.png")} />
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
