import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthStackScreen from "./src/navigation/AuthStackscreen";

import Colors from "./src/ref/Colors";
import AppContainer from "./src/components/utils/Context/MainState";

function App() {
  React.useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor(Colors.Background);
  }, []);

  return (
    <AppContainer>
      <NavigationContainer>
        <AuthStackScreen />
      </NavigationContainer>
    </AppContainer>
  );
}

export default App;
