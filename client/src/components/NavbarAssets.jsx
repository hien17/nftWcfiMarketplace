import React from 'react'
import "../App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Routes,
} from "react-router-dom";

const NavbarAssets = () => {
  return (
    <div className="Navbar text-white flex flex-row justify-between items-center ">
      <Link
        to=".."
        className="WCFIFooter text-34 font-bold leading-42 text-5xl font-bold text-left"
      >
        WCFI
      </Link>
      <div className="text-base font-bold leading-28 flex flex-row items-start p-0 gap-10">
        <Link to="../home">Home</Link>
        <Link to="../marketplace">Marketplace</Link>
        <a
          className="bg-gradient-to-r from-teal-200 via-cyan-300 
      via-purple-400 to-pink-400 text-transparent 
        bg-clip-text "
        >
          Assets
        </a>
      </div>
      <div>
        <div></div>
        <button
          className="flex flex-row justify-center 
      items-center bg-gradient-to-r from-teal-200 
      via-cyan-300 via-purple-400 to-pink-400 
      text-base font-bold
      rounded-2xl border-r-4 border-b-4 py-3 px-6
       "
        >
          <Link to="/home" className="">
            Connect Wallet
          </Link>
        </button>
      </div>
    </div>
  );
}

export default NavbarAssets