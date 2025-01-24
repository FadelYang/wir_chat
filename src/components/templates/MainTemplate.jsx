import React from "react";
import NavBar from "../organism/NavBar";
import Footer from "../organism/Footer";

const MainTemplate = ({ children }) => {
  return (
    <div className="container-fluid flex flex-col min-h-screen mx-auto">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
};

export default MainTemplate;
