import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children, onToggleDarkMode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>

      <Footer onToggleDarkMode={onToggleDarkMode} />
    </>
  );
};

export default Layout;