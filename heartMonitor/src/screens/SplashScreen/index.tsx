import React from "react";
import { View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../../ref/Colors";
import { apiendpoint } from "../../components/utils/apiendpoint";
import AppContext, { Context } from "../../components/utils/Context/MainContext";

const SplashScreen = (props: any) => {
  const { setUser } = React.useContext<any>(AppContext);

  React.useEffect(() => {
    setTimeout(async () => {
      const jwt = await AsyncStorage.getItem("jwt");
      console.log(jwt);
      if (!jwt) props.navigation.navigate("Login");
      else
        fetch(`${apiendpoint}/auth/getUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
          }
        })
          .then((res) => {
            console.log(res.status);
            if (res.ok) return res.json();
            else throw new Error("Unauthorized");
          })
          .then((json) => {
            setUser(json.data);
            props.navigation.navigate("Monitor");
          })
          .catch(console.log);
      /* props.navigation.navigate("Monitor"); */
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
