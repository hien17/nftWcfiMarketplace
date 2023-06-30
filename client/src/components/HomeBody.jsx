import React, { useEffect, useState, useContext } from "react";
import { colors } from "../constants/colors";
import HomeImage from "/Image/HomeImage.png";
import { Context } from "../context/Context.jsx";
import { shortenAddress } from "../utils/shortenAddress";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import Tier from "./Tier";
import Modal from "@mui/material/Modal";
import Box from "@mui/system/Box";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useQuery, gql } from '@apollo/client'
import { marketplaceABI, marketplaceAddress } from "../utils/constantsMarket";
import { contractABI, contractAddress } from "../utils/constants";
import Moralis from "moralis-v1";
import {findRarity,findValue,getTier,
  findRarityAndValue,tier1Array,tier2Array,
tier3Array,tier4Array} from "./Data";


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
    handleMintNFT,
    showModal,
    setShowModal,
    mintedNftDetails,
    txHash,
    
  } = useContext(Context);
  
  const {enableWeb3} = useMoralis();
  useEffect(() => {
    const enableWeb3Async = async () => {
      try {
        await enableWeb3();
        // Web3 is now enabled and ready to use
      } catch (error) {
        console.error("Error enabling web3:", error);
      }
    };

    enableWeb3Async();
  }, []);
  console.log(txHash);
  const viewOnBscscan = () => {
      window.open(`https://testnet.bscscan.com/tx/${txHash}`, "_blank");
  };
  const viewContract = () => {
    window.open(`https://testnet.bscscan.com/address/${contractAddress}`, "_blank");
};
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
              <button
                className="text-sm bg-gradient-to-r 
              from-teal-200 via-cyan-300 via-purple-400
               to-pink-400 text-transparent 
               bg-clip-text"
               onClick={viewContract}
              >
                View Contract
              </button>
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
                          <button className="" onClick={handleMintNFT}>
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
                                  onClick={() => {
                                    viewOnBscscan();
                                    // window.open(`https://testnet.bscscan.com/tx/${txHash}`, "_blank");
                                  }}
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
