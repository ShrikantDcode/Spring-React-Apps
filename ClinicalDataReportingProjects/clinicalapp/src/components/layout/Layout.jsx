import React from "react";
// components
import Menu from "./Menu";
import Footer from "../Footer";
import "./Layout.css";

const Layout = ({ profile, children }) => {
  return (
    <>
      <Menu profile={profile} />
      <main className="main-content">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
