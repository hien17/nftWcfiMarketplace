import React from "react";
import "../App.css";
import { BrowserRouter as Router, Route, Link, NavLink, Routes } from "react-router-dom";
  
const Introduce = () => {
  return (
    <div className="flex flex-col max-w-3xl justify-items-start p-0 gap-16 w-796 h-552 absolute left-8 top-80">
      <div className="flex flex-col text-left text-8xl w-full 
      font-bold leading-snug self-stretch">
        <div>Build Your </div>
        <div>Team</div>
        </div>
      <div className="flex flex-row text-slate-500 ">
        WCFI is the world's first BSC-based NFT football bet game. With the
        combination of Web3 and blockchain technology, players can participate
        in betting through Defi in real time by holding the NFT of their
        favorite team and sharing the reward after each match.
      </div>
      <Link to="/home">
      <div className=" flex">
        <button className="rounded-2xl bottom-0 left-0  
        bg-gradient-to-r from-teal-200 via-cyan-300 
        via-purple-400 to-pink-400">
            <div className="m-1 bg-black rounded-2xl">
               <p className=" px-4 py-6 text-white">
                Mint Your NFT</p> 
            </div>
            
            </button>
      </div></Link>
    </div>
  );
};

export default Introduce;
