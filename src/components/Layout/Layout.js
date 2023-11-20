import React from "react";
import Navbar from "../../feature/common/Navbar";
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
