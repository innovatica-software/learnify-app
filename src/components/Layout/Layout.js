import React from "react";
import Navbar from "../../feature/common/Navbar";
import Footer from "../../feature/common/Footer";
const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
