import React from "react";
import { Navbar, Footer, Introduce, IntroduceImage } from "../components";

const LandingPage = () => {
  return (
    <div className="w-full h-full bg-black flex">
      <Navbar></Navbar>
      <Introduce></Introduce>
      <IntroduceImage></IntroduceImage>
      <Footer>Footer</Footer>
    </div>
  );
};

export default LandingPage;
