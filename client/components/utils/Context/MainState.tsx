import React from "react";

import AppContext, { User } from "./MainContext";

const AppContainer = (props: any) => {
  const [user, setUser] = React.useState<User | null>(null);

  return <AppContext.Provider value={{ user, setUser }}>{props.children}</AppContext.Provider>;
};

export default AppContainer;
