import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AccessTokenProvider = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [token, setToken] = useState(userInfo?.accessToken || false);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};