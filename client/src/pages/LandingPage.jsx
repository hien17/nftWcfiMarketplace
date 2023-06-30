import React from "react";
import { Navbar, Footer, Introduce, IntroduceImage } from "../components";

const LandingPage = () => {
  return (
    <div className="w-screen h-[6485px] bg-black">
      <Navbar></Navbar>
      <Introduce></Introduce>
      <IntroduceImage></IntroduceImage>
      <Footer>Footer</Footer>
    </div>
  );
};

export default LandingPage;
