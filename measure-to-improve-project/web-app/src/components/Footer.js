import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer
        style={{
          fontSize: "0.8em",
          height: "2em",
          left: "0",
          position: "fixed",
          width: "100%",
          display: "block",
          bottom: "0",
          background: "white",
        }}
        className="text-center text-capitalize"
      >
        <b>©Shrikant Dande</b> "You can't improve what you don't measure."
      </footer>
    </>
  );
};

export default Footer;
