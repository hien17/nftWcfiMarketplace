import React from "react";
import "../App.css";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Routes,
} from "react-router-dom";

const Navbar = () => {
  return (
    <div className="Navbar text-white flex flex-row justify-between items-center ">
      <div className="WCFIFooter text-34 font-bold leading-42 text-5xl font-bold text-left">
        WCFI
      </div>
      <div className="text-base font-bold leading-28 flex 
      flex-row items-start p-0 gap-10">
        <a
          className="bg-gradient-to-r from-teal-200 via-cyan-300 
      via-purple-400 to-pink-400 text-transparent 
        bg-clip-text "
        >
          Home
        </a>
        <a>Marketplace</a>
        <a>Game Mechanics</a>
      </div>
      <button className="flex flex-row justify-center 
      items-center bg-gradient-to-r from-teal-200 
      via-cyan-300 via-purple-400 to-pink-400 
      text-base font-bold
      rounded-2xl border-r-4 border-b-4 py-3 px-6
       ">
        <Link
          to="/home"
          className=""
        >
          Play Game
        </Link>
      </button>
    </div>
  );
};

export default Navbar;
