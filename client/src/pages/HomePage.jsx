import React from "react";
import { ContextProvider } from "../context/Context.jsx";
import { Footer, NavbarHome, HomeBody } from "../components";

const HomePage = () => {
  return (
    <ContextProvider>
      <div className="flex">
        <NavbarHome></NavbarHome>
        <HomeBody></HomeBody>
      </div>
    </ContextProvider>
  );
};

export default HomePage;
