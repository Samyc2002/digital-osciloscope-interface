import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StatusBar } from "react-native";
import AuthStackScreen from "./src/navigation/AuthStackscreen";

import Colors from "./src/ref/Colors";

function App() {
  React.useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor(Colors.Background);
  }, []);

  return (
    <NavigationContainer>
      <AuthStackScreen />
    </NavigationContainer>
  );
}

export default App;
