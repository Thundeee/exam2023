import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AccessTokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};