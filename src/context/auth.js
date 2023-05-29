import React, { createContext, useState } from "react";

export const AuthContext = createContext();

// Setting of the token with first visit to see if they already have a token/is logged in
export const AccessTokenProvider = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [token, setToken] = useState(userInfo?.accessToken || false);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
