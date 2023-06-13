import React, { useContext } from "react";
import "../App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import BUSD from "../image/BUSD.png";
import { Context } from "../context/Context.jsx";
import { shortenAddress } from "../utils/shortenAddress";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Routes,
} from "react-router-dom";

const NavbarHome = () => {
  // const [address, setAddress] = useState("");

  // useEffect(() => {
  //   if (window.ethereum) {
  //     window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
  //       if (accounts.length > 0) {
  //         setAddress(
  //           accounts[0].substring(0, 6) +
  //             "..." +
  //             accounts[0].substring(accounts[0].length - 4)
  //         );
  //       }
  //     });
  //   }
  // }, []);

  // const connectWallet = () => {
  //   if (window.ethereum) {
  //     window.ethereum
  //       .request({ method: "eth_requestAccounts" })
  //       .then((accounts) => {
  //         setAddress(
  //           accounts[0].substring(0, 6) +
  //             "..." +
  //             accounts[0].substring(accounts[0].length - 4)
  //         );
  //       });
  //   }
  // };
  const { currentAccount, connectWallet } = useContext(Context);
  return (
    <div className="Navbar text-white flex flex-row justify-between items-center ">
      <Link
        to=".."
        className="WCFIFooter text-34 font-bold leading-42 text-5xl font-bold text-left"
      >
        WCFI
      </Link>
      <div className="text-base font-bold leading-28 flex flex-row items-start p-0 gap-10">
        <a
          className="bg-gradient-to-r from-teal-200 via-cyan-300 
      via-purple-400 to-pink-400 text-transparent 
        bg-clip-text "
        >
          Home
        </a>
        <Link to="../marketplace">Marketplace</Link>
        <Link to="../assets">Assets</Link>
      </div>
      <div className="flex gap-x-10">
        <div className="flex my-1 items-center">
          <div className="">
            <img className="max-h-10 mr-2" src={BUSD} />
          </div>
          <div className="flex flex-col">
            <p className="text-left text-slate-500">BUSD</p>
            <p>{currentAccount ? "200,000.00" : "0"}</p>
          </div>
        </div>
        {currentAccount ? (
          <button
            className="
      items-center bg-gradient-to-r from-teal-200 
      via-cyan-300 via-purple-400 to-pink-400 
      text-base rounded-2xl 
       "
          ><div className="m-0.5 bg-black py-[14px] rounded-2xl">
            <Link to="/home" className=" py-3 px-6">
              {currentAccount
                ? shortenAddress(currentAccount)
                : "Connect Wallet"}
            </Link></div>
            
          </button>
        ) : (
          <button
            className="relative flex flex-row justify-center 
      items-center bg-gradient-to-r from-teal-200 
      via-cyan-300 via-purple-400 to-pink-400 
      text-base border-white
      rounded-2xl border-r-4 border-b-4 py-3 px-6 
       "
            onClick={connectWallet}
          >
            <div className="absolute top-0 left-0 h-full w-full z-10 rounded-xl border-black border-2"></div>
              <Link to="/home" className="relative z-20
               text-white ">
              Connect Wallet
            </Link>
            
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarHome;
