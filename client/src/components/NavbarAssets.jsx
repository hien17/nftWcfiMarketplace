import React, { useContext } from "react";
import "../App.css";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import BUSD from "/Image/BUSD.png";
import { Context } from "../context/Context.jsx";
import { shortenAddress } from "../utils/shortenAddress";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Routes,
} from "react-router-dom";

const NavbarAssets = () => {
  const { currentAccount, connectWallet, getAccountBalance } =
    useContext(Context);
  // var accountBalance = getAccountBalance();
  // console.log(accountBalance);
  const [balance, setBalance] = useState("0.00");

  useEffect(() => {
    const updateBalance = async () => {
      if (!currentAccount) {
        return;
      }
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      const signer = provider.getSigner();
      const balance = await signer.getBalance();
      const bnbBalance = ethers.utils.formatEther(balance);
      setBalance(parseFloat(bnbBalance).toFixed(2));
    };
    updateBalance();
  }, [currentAccount]);
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
      <div className="flex gap-x-10">
        <div className="flex my-1 items-center">
          <div className="">
            <img className="max-h-10 mr-2" src={BUSD} />
          </div>
          <div className="flex flex-col">
            <p className="text-left text-slate-500">BUSD</p>
            <p>{currentAccount ? balance : "0"}</p>
          </div>
        </div>
        {currentAccount ? (
          <button
            className="
      items-center bg-gradient-to-r from-teal-200 
      via-cyan-300 via-purple-400 to-pink-400 
      text-base rounded-2xl 
       "
          >
            <div className="m-0.5 bg-black py-[14px] rounded-2xl">
              <Link to="/assets" className=" py-3 px-6">
                {currentAccount
                  ? shortenAddress(currentAccount)
                  : "Connect Wallet"}
              </Link>
            </div>
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
            <Link
              to="/assets"
              className="relative z-20
               text-white "
            >
              Connect Wallet
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default NavbarAssets;
