import React, { useEffect, useState, useContext } from "react";
import { colors } from "../constants/colors";
import HomeImage from "/Image/HomeImage.png";
import { Context } from "../context/Context.jsx";
import { shortenAddress } from "../utils/shortenAddress";
import { AiOutlineQuestionCircle } from "react-icons/Ai";
import Tier from "./Tier";
import Modal from "@mui/material/Modal";
import Box from "@mui/system/Box";
const tier1Array = [
  { name: "Brazil", minted: "84", rarity: "0.08%", value: "≈$96,000" },
  { name: "France", minted: "104", rarity: "0.10%", value: "≈$77,538" },
  { name: "England", minted: "112", rarity: "0.11%", value: "≈$72,000" },
  { name: "Spain", minted: "104", rarity: "0.14%", value: "≈$57,600" },
  { name: "Germany", minted: "118", rarity: "0.19%", value: "≈$42,894" },
  { name: "Argentina", minted: "118", rarity: "0.19%", value: "≈$42,894" },
  { name: "Belgium", minted: "226", rarity: "0.22%", value: "≈$5,681" },
  { name: "Portugal", minted: "226", rarity: "0.22%", value: "≈$35,681" },
];
const tier2Array = [
  { name: "Netherlands", minted: "264", rarity: "0.26%", value: "≈$30,545" },
  { name: "Denmark", minted: "526", rarity: "0.52%", value: "≈$15,331" },
  { name: "Croatia", minted: "658", rarity: "0.65%", value: "≈$12,255" },
  { name: "Uruguay", minted: "940", rarity: "0.93%", value: "≈$8,579" },
  { name: "Poland", minted: "1,221", rarity: "1.21%", value: "≈$6,604" },
  { name: "Senegal", minted: "1,221", rarity: "1.21%", value: "≈$6,604" },
  { name: "United States", minted: "1,503", rarity: "1.49%", value: "≈$5,365" },
  { name: "Serbia", minted: "1,503", rarity: "1.49%", value: "≈$5,365" },
];
const tier3Array = [
  { name: "Switzerland", minted: "1,503", rarity: "1.49%", value: "≈$5,365" },
  { name: "Mexico", minted: "1,879", rarity: "1.86%", value: "≈$4,292" },
  { name: "Wales", minted: "1,879", rarity: "1.86%", value: "≈$4,292" },
  { name: "Ghana", minted: "2,818", rarity: "2.80%", value: "≈$2,862" },
  { name: "Ecuador", minted: "2,818", rarity: "2.80%", value: "≈$2,146" },
  { name: "Morocco", minted: "1,3,758", rarity: "3.73%", value: "≈$2,146" },
  { name: "Cameroon", minted: "4,698", rarity: "4.66%", value: "≈$1,716" },
  { name: "Canada", minted: "4,698", rarity: "4.66%", value: "≈$1,716" },
];
const tier4Array = [
  { name: "Japan", minted: "4,698", rarity: "4.66%", value: "≈$1,716" },
  { name: "Qatar", minted: "4,698", rarity: "4.66%", value: "≈$1,716" },
  { name: "Tunisia", minted: "5,367", rarity: "5,59%", value: "≈$1,431" },
  { name: "South Korea", minted: "7,516", rarity: "7,46%", value: "≈$1,073" },
  { name: "Australia", minted: "7,516", rarity: "7,46%", value: "≈$1,073" },
  { name: "Iran", minted: "9,395", rarity: "9,32%", value: "≈$858" },
  { name: "Saudi Arabia", minted: "9,395", rarity: "9,32%", value: "≈$858" },
  { name: "Costa Rica", minted: "18,790", rarity: "18,64%", value: "≈$429" },
];
const tierNumber = [1, 2, 3, 4];
const findRarityAndValue = (name) => {
  const arrays = [tier1Array, tier2Array, tier3Array, tier4Array];

  for (const array of arrays) {
    const obj = array.find((obj) => obj.name === name);
    if (obj) {
      return { rarity: obj.rarity, value: obj.value };
    }
  }

  return null;
};

import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Routes,
} from "react-router-dom";

const HomeBody = () => {
  const {
    currentAccount,
    connectWallet,
    handleMint,
    showModal,
    setShowModal,
    mintedNftDetails,
    nftId,
  } = useContext(Context);
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
                <div className="text-sm text-slate-500 flex flex-row">
                  <p>Minted rate:</p>
                  <AiOutlineQuestionCircle className="ml-2 mt-1" />
                </div>
                <p className="justify-right absolute right-0">20% Get Tier 1</p>
              </div>
              {currentAccount ? (
                <div
                  className="rounded-2xl relative flex flex-row
                  justify-center items-center
              bg-gradient-to-r from-teal-200 via-cyan-300 
              via-purple-400 to-pink-400 border-r-4 border-b-4 border-white"
                >
                  <div
                    className=" py-4 px-[75px] z-10 h-full w-full
                   rounded-xl border-black border-2"
                  >
                    <Link
                      to="/home"
                      className=" text-white relative z-20  py-auto px-auto"
                    >
                      {currentAccount ? (
                        <>
                          <button className="" onClick={handleMint}>
                            <p>{"Mint\u00a0with\u00a00.001\u00a0BNB"}</p>
                          </button>
                          <Modal
                            open={showModal}
                            onClose={() => setShowModal(false)}
                          >
                            <Box
                              sx={{
                                position: "flex",
                              }}
                              className=""
                            >
                              <Box
                                className=" rounded-xl"
                                sx={{position: "absolute",top: "45%",left: "50%",transform: "translate(-50%, -50%)",width: "464px",height: "628px",display: "flex",flexDirection: "column",alignItems: "flex-start",alignSelf: "flex-start",padding: 0,background: "black",borderRadius: "12px",boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.25)",overflow: "hidden",border: "1px solid",borderImageSource:
                                    "linear-gradient(102.88deg, #80E8DD 10.19%, #7CC2F6 43.04%, #AF81E4 72%, #D855A6 93.18%)",borderImageSlice: "1",
                                }}
                              >
                                <div className="text-white bg-black flex flex-col h-full">
                                  {mintedNftDetails ? (
                                    <>
                                      <img
                                        className="bg-black p-[40px] scale-80"
                                        src={`/Image/Tiers/${mintedNftDetails?.traits}.png`}
                                      />
                                      <div
                                        className="bg-[#0E1114] w-full h-full p-[32px]
                                      grid grid-cols-2 pb-[16px] gap-4"
                                      >
                                        <div className="flex flex-col gap-2">
                                          <p className="text-slate-500">Team</p>
                                          <p>{mintedNftDetails?.traits}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                          <div className="text-slate-500">
                                            Rarity{" "}
                                          </div>
                                          <div>
                                            {
                                              findRarityAndValue(
                                                mintedNftDetails.traits
                                              ).rarity
                                            }
                                          </div>
                                        </div>
                                        
                                        <div className="text-slate-500">
                                          Estimate{" "}
                                        </div>
                                        <div>
                                          {
                                            findRarityAndValue(
                                              mintedNftDetails.traits
                                            ).value
                                          }
                                        </div>
                                      
                                      </div>
                                     
                                    </>
                                  ) : (
                                    <Box
                                      sx={{width: 200,height: 200,background: "#232323",borderRadius: 12,
                                      }}
                                    />
                                  )}
                                </div>
                              </Box>
                              <Box
                                className=""
                                sx={{position: "absolute",top: "790px",left: "50%",transform: "translateX(-50%)",display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",padding: "16px 24px",gap: 8,width: 464,height: 56, background:
                                    "linear-gradient(102.88deg, #80E8DD 10.19%, #7CC2F6 43.04%, #AF81E4 72%, #D855A6 93.18%)",border: "2px solid #080A0C",boxShadow: "4px 4px 0px #FFFFFF",borderRadius: "12px",flex: "none",alignSelf: "flex-end",flexGrow: 0,color: "#FFFFFF", fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", cursor: "pointer",marginTop: "0px", "&:hover": {background:
                                      "linear-gradient(102.88deg, #7CC2F6 10.19%, #80E8DD 43.04%, #D855A6 72%, #AF81E4 93.18%)",boxShadow: "2px 2px 0px #FFFFFF",},
                                }}
                              >
                                <button onClick={() => setShowModal(false)}>
                                  Collect
                                </button>
                              </Box>
                              <Box
                                sx={{position: "absolute",top: "874px",left: "50%",transform: "translateX(-50%)",display: "flex",flexDirection: "row",justifyContent: "center",alignItems: "center",padding: "16px 24px",gap: 8,width: 464, height: 56, background: "#0E1114", borderRadius: "12px",flex: "none",alignSelf: "flex-end",flexGrow: 0,color: "#FFFFFF",fontSize: "18px", fontWeight: "bold", textTransform: "uppercase", cursor: "pointer",marginTop: "0px", border: "1px solid",borderImageSource:
                                    "linear-gradient(102.88deg, #80E8DD 10.19%, #7CC2F6 43.04%, #AF81E4 72%, #D855A6 93.18%)",borderImageSlice: "1",
                                }}
                              >
                                <button
                                  sx={{color: "#FFFFFF",fontSize: "18px",fontWeight: "bold",textTransform: "uppercase",cursor: "pointer",height: "56px",width: "464px",border: "none",background: "transparent","&:hover": {  color: "#7CC2F6",},
                                  }}
                                  onClick={() => setShowModal(false)}
                                >
                                  View On BSCscan
                                </button>
                              </Box>
                            </Box>
                          </Modal>
                        </>
                      ) : (
                        "Connect\u00a0Wallet"
                      )}
                    </Link>
                  </div>
                </div>
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
          <div className="bg-[#0E1114] h-[1312px]">
            <div className="flex-col">
              <div className="flex flex-row">
                <div className="w-[547px]">
                  {/* {Tier({ tierArray, tierNumber })} */}
                  <Tier key={1} tierNumber={1} tierArray={tier1Array} />
                </div>
                <div className="w-[40px] bg-black"></div>
                <div className="w-[547px]">
                  <Tier key={2} tierNumber={2} tierArray={tier2Array} />
                </div>
              </div>
              <div className="flex flex-row h-[40px] bg-black"></div>
              <div className="flex flex-row">
                <div className="w-[547px]">
                  <Tier key={3} tierNumber={3} tierArray={tier3Array} />
                </div>
                <div className="w-[40px] bg-black"></div>
                <div className="w-[547px]">
                  <Tier key={4} tierNumber={4} tierArray={tier4Array} />
                </div>
              </div>
              <div className="flex flex-row h-[40px] bg-black"></div>
            </div>

            <div className="w-[636px] absolute right-0 top-0"></div>
            <div className="w-[636px] absolute left-0 bottom-0"></div>
            <div className="w-[636px] absolute right-0 bottom-0"></div>
          </div>
        </div>
        <div className="w-[464px] bg-black flex-col flex gap-10">
          <div className="h-[585px] bg-[#0E1114]"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeBody;
