import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar, Footer, Introduce, IntroduceImage } from "./components";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  NavLink,
  BrowserRouter,
} from "react-router-dom";
import { LandingPage, HomePage, MarketplacePage, AssetsPage } from "./pages";
import { ContextProvider } from "./context/Context";

function App() {
  // return (
  //   <div className="">
  //     <Navbar></Navbar>
  //     <Introduce></Introduce>
  //     <IntroduceImage></IntroduceImage>
  //     <Footer>Footer</Footer>
  //   </div>
  // );
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/assets" element={<AssetsPage />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
