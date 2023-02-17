import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MonitorScreen from "../../screens/MonitorScreen";
import LoginScreen from "../../screens/LoginScreen";
import SplashScreen from "../../screens/SplashScreen";

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName="SplashScreen">
      <AuthStack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name="Monitor" component={MonitorScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;
