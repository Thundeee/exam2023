import React, { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const ThemeContext = createContext();
// Context to toggle darkmode/lightmode
export const ThemeChangerProvider = ({ children }) => {
  const [mode, setMode] = useLocalStorage("Darkmode", "");
  const [isDarkMode, setIsDarkMode] = useState(mode);

  const toggleDarkMode = () => {
    setMode(!isDarkMode ? true : false);
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
