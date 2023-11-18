import React from "react";
import Navbar from "../../feature/common/Navbar";
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div style={{ marginTop: "64px" }}>{children}</div>
    </div>
  );
};

export default Layout;
