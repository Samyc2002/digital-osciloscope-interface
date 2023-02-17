import React from "react";

export interface User {
  id: String;
  name: String;
  phone: Number;
}

interface Context {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AppContext = React.createContext<Context | null>(null);

export default AppContext;
