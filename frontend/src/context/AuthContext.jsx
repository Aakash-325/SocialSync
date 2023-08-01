/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authJSON = localStorage.getItem("auth");
  const auth = JSON.parse(authJSON);
  const [user, setUser] = useState(auth?.user || null);
  const [token, setToken] = useState(auth?.token || null);

  const Logout = () => {
    setUser(undefined);
    setToken(undefined);
    localStorage.removeItem("auth");
  };

  const Authdata = {
    user: user,
    token: token,
    setUser,
    setToken,
    logout: Logout,
  };

  return (
    <AuthContext.Provider value={Authdata}>{children}</AuthContext.Provider>
  );
};
