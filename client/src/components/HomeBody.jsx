import React, { useEffect, useState, useContext } from "react";
import { colors } from "../constants/colors";
import HomeImage from "../image/HomeImage.png";
import { Context } from "../context/Context.jsx";
import { shortenAddress } from "../utils/shortenAddress";
import { AiOutlineQuestionCircle } from "react-icons/Ai";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Routes,
} from "react-router-dom";

const HomeBody = () => {
  const { currentAccount, connectWallet } = useContext(Context);
  return (
    <div className="bg-black w-full mx-auto flex justify-center">
      <div
        className="pt-40 pb-44  text-white 
      w-[1638px] h-[1962px]
      flex flex-row gap-10 "
      >
        <div className="w-[1134px] bg-black flex-col flex gap-10">
          <div className="h-[194px] bg-[#0E1114] p-10 flex gap-10">
            <div className="text-left w-[630px]">
              <p className="text-sm text-slate-500">Total reward</p>
              <p className="text-4xl">$ 8.064.000</p>
              <a
                className="text-sm bg-gradient-to-r 
              from-teal-200 via-cyan-300 via-purple-400
               to-pink-400 text-transparent 
               bg-clip-text"
              >
                View Contract
              </a>
            </div>
            <div className="text-left w-[384px]">
              <p className="text-sm text-slate-500"> Participant</p>
              <p className="text-4xl">40.320</p>
            </div>
          </div>
          <div className="bg-[#0E1114] h-[376px] flex-row flex">
            <div className="w-[680px] h-[376px]">
              <img src={HomeImage}></img>
            </div>
            <div className="p-10 w-[464px] text-left ">
              <p className="text-xl pb-6">Mint Your NFT</p>
              <p className="text-sm pb-6 text-slate-500">
                Mint randomly releases NFT shoes to represent the national team
              </p>
              <div className="flex flex-row w-full relative">
                <p className="text-sm pb-3 text-slate-500 ">Minted times:</p>
                <p className="justify-right absolute right-0">0</p>
              </div>
              <div className="flex flex-row pb-16 relative">
                <p className="text-sm text-slate-500 flex flex-row">
                  <p>Minted rate:</p>
                  <AiOutlineQuestionCircle className="ml-2 mt-1"/>
                </p>
                <p className="justify-right absolute right-0">20% Get Tier 1</p>
              </div>
              {currentAccount ? (
                <button
                  className="rounded-2xl relative flex flex-row
                  justify-center items-center
              bg-gradient-to-r from-teal-200 via-cyan-300 
              via-purple-400 to-pink-400 border-r-4 border-b-4 border-white"
                >
                  <div className=" py-4 px-[102px] z-10 h-full w-full
                   rounded-xl border-black border-2">
                    <Link to="/home" className=" text-white relative z-20  py-3 px-6">
                      {currentAccount ? "Mint\u00a0NFT" : "Connect\u00a0Wallet"}
                    </Link>
                  </div>
                </button>
              ) : (
                <button
                  className="rounded-2xl  
                bg-gradient-to-r from-teal-200 via-cyan-300 
                via-purple-400 to-pink-400 "
                  onClick={connectWallet}
                >
                  <div className="m-0.5 py-4 px-[102px] bg-black rounded-2xl ">
                    <Link to="/home" className="text-white text-base">
                      {currentAccount ? "Mint NFT" : "Connect\u00a0Wallet"}
                    </Link>
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="bg-[#0E1114] h-[1312px]">3</div>
        </div>
        <div className="w-[464px] bg-black flex-col flex gap-10">
          <div className="h-[585px] bg-[#0E1114]"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
