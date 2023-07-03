import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context.jsx";
import BUSD from "/Image/BUSD.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/system/Box";
import { Button } from "@mui/material";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants.js";
import { useMoralis, useWeb3Contract } from "react-moralis";
import {findRarity,findValue,getTier,convertTierToColor,convertTierToBorderColor} from "./Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SingleCard = ({ listing}) => {
  const {
    currentAccount,
    connectWallet,
    contractAddress,
    marketplaceAddress,
    marketplaceABI,
    showToastPending,
    showToastSuccess,
  } = useContext(Context);
  const { user, enableWeb3, isWeb3Enabled, 
    account, isWeb3EnableLoading } = useMoralis();

  const [isApproved, setIsApproved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalSell, setShowModalSell] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const isApprovalForAll = async (owner, operator) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contractABI = [
      // Include the isApprovedForAll function from your NFT contract
      "function isApprovedForAll(address owner, address operator) public view returns (bool)",
    ];
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      provider
    );

    const approved = await contract.isApprovedForAll(owner, operator);
    return approved;
  };
  const checkApproval = async () => {
    const approved = await isApprovalForAll(currentAccount, marketplaceAddress);
    setIsApproved(approved);
  };

  useEffect(() => {
    checkApproval();
  }, [currentAccount, marketplaceAddress]);

  const [enteredPrice, setEnteredPrice] = useState("");
  const [receivedAmount, setReceivedAmount] = useState("");

  const handleInput = (event) => {
    const price = event.target.value;
    setEnteredPrice(price);
    const received = (parseFloat(price) * 0.95).toFixed(4);
    setReceivedAmount(received);
  };

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

  //listNFT
  const {
    runContractFunction: listNFT,
    data: dataListNFT,
    isLoadingListNFT,
    isFetchingListNFT,
  } = useWeb3Contract({
    abi: marketplaceABI,
    contractAddress: marketplaceAddress,
    functionName: "listNFT",
    params: {
      tokenId: listing.tokenId,
      price: BigInt(enteredPrice * 10 ** 18),
    },
  });
  const handleSell = async () => {
    setShowModalSell(false);
    setShowModal(false);
    try {
      showToastPending();
      const rtListNFT = await listNFT({
        onSuccess: (tx) => tx.wait().then(() =>  {
          console.log("LIST NFT SUCCESSFULL !");
          showToastSuccess();
          setTimeout(() =>{
            window.location.reload();
          }, 4000);
        }),
        onError: (error) => console.log(error),
      });
      if (!rtListNFT) toast.dismiss();
    } catch (error) {
      console.error("Error List NFT:", error);
    }
  };

  //unlistNFT
  const {
    runContractFunction: unlistNFT,
    data: dataUnlistNFT,
    isLoadingUnlistNFT,
    isFetchingUnlistNFT,
  } = useWeb3Contract({
    abi: marketplaceABI,
    contractAddress: marketplaceAddress,
    functionName: "unlistNFT",
    params: { tokenId: listing.tokenId },
  });
  const handleUnlist = async () => {
    setShowModal(false);
    try {
      showToastPending();
      const rtListNFT = await unlistNFT({
        onSuccess: (tx) => tx.wait().then(() =>  {
          console.log("UNLIST NFT SUCCESSFULL !");
          showToastSuccess();
          setTimeout(() =>{
            window.location.reload();
          }, 4000);
        }),
        onError: (error) => console.log(error),
      });
      if (!rtListNFT) toast.dismiss();
    } catch (error) {
      console.error("Error Unlist NFT:", error);
    }
  };

  //buyNFT
  const {
    runContractFunction: buyNFT,
    data: dataBuyNFT,
    isLoadingBuyNFT,
    isFetchingBuyNFT,
  } = useWeb3Contract({
    abi: marketplaceABI,
    contractAddress: marketplaceAddress,
    functionName: "buyNFT",
    params: { tokenId: listing.tokenId },
    msgValue: listing.price,
  });
  const handleBuy = async () => {
    setShowModal(false);
    try {
      showToastPending();
      const rtListNFT = await buyNFT({
        onSuccess: (tx) => tx.wait().then(() =>  {
          console.log("BUY NFT SUCCESSFULL !");
          showToastSuccess();
          setTimeout(() =>{
            window.location.reload();
          }, 4000);
        }),
        onError: (error) => console.log(error),
      });
      if (!rtListNFT) toast.dismiss();
    } catch (error) {
      console.error("Error Buy NFT:", error);
    }
  };

  //updateListingPrice
  const {
    runContractFunction: updateListing,
    data: dataUpdate,
    isLoadingUpdate,
    isFetchingUpdate,
  } = useWeb3Contract({
    abi: marketplaceABI,
    contractAddress: marketplaceAddress,
    functionName: "updateListingNFTPrice",
    params: {
      tokenId: listing.tokenId,
      price: BigInt(enteredPrice * 10 ** 18),
    },
  });
  const handleUpdate = async () => {
    setShowModalSell(false);
    setShowModal(false);
    try {
      showToastPending();
      const rtListNFT = await updateListing({
        onSuccess: (tx) => tx.wait().then(() =>  {
          console.log("UPDATE PRICE SUCCESSFULL !");
          showToastSuccess();
          setTimeout(() =>{
            window.location.reload();
          }, 4000);
        }),
        onError: (error) => console.log(error),
      });
      if (!rtListNFT) toast.dismiss();
    } catch (error) {
      console.error("Error Update NFT:", error);
    }
  };
  //set Approval For All NFTs
  const {
    runContractFunction: setApprovalForAll,
    data: dataSetApprovalForAll,
    isLoadingSAFA,
    isFetchingSAFA,
  } = useWeb3Contract({
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "setApprovalForAll",
    params: { operator: marketplaceAddress, approved: true },
  });
  const handleApprove = async () => {
    setShowModal(false);
    try {
      showToastPending();
      const rtListNFT = await setApprovalForAll({
        onSuccess: (tx) => tx.wait().then(() =>  {
          console.log("APPROVE SUCCESSFULL !");
          showToastSuccess();
          setTimeout(() =>{
            window.location.reload();
          }, 4000);
        }),
        onError: (error) => console.log(error),
      });
      if (!rtListNFT) toast.dismiss();
    } catch (error) {
      console.error("Error Approve NFT:", error);
    }
  };
  return (
    <div>
      <div
        className={` ${convertTierToBorderColor[getTier(listing.traits)]} 
    bg-[#0E1114] rounded-lg h-fit
    `}
        onClick={() => setShowModal(true)}
      >
        <div
          className="w-full h-[464px] rounded-t-lg 
      bg-black flex justify-center"
        >
          <img
            className="object-contain 
        rounded-lg scale-75"
            src={`/Image/Tiers/${listing.traits}.png`}
            alt="single-card"
          />
        </div>

        <div className="bg-[#0E1114] flex flex-col pt-[24px]  pl-[24px] pr-[24px] pb-[32px] rounded-b-lg">
          <div className="flex flex-row justify-between mb-[16px] flex-wrap text-left">
            <div className="w-[48%]">
              <p className="text-sm text-slate-500 ">Team</p>
              <p className="text-white">{listing.traits}</p>
            </div>
            <div className="w-[48%]">
              <p className="text-sm text-slate-500">Rarity</p>
              <p className="text-white">{findRarity(listing.traits)}</p>
            </div>
          </div>
          <div className="flex flex-row justify-between flex-wrap text-left">
            <p className="text-sm text-slate-500 w-[48%] ">Price</p>
            <div className="text-white w-[48%] flex flex-row">
              <img className="max-h-[24px] mr-2" src={BUSD} />
              {listing.price / 10 ** 18}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          open={showModal}
          onClose={() => setShowModal(false)}
          className="bg-opacity-64 bg-[191D24] 
          bg-blur-sm backdrop-blur-sm bg-cover"
        >
          <Box className="h-[604px] w-[968px] bg-black mt-[120px] mx-auto pt-[40px] px-[40px] pb-[64px] flex flex-col space-y-[40px]">
            <Box className="text-white">NFT Details</Box>
            <Box className="border border-black h-full w-full grid grid-cols-2 gap-[24px]">
              <Box className="bg-black">
                <img
                  className="object-contain 
        rounded-lg scale-75"
                  src={`/Image/Tiers/${listing.traits}.png`}
                  alt="single-card"
                />
              </Box>
              <Box className="bg-black flex flex-col space-y-[40px]">
                <Box className="bg-black flex flex-col text-white space-y-[16px]">
                  <p
                    className={`text-xl ${
                      convertTierToColor[getTier(listing.traits)]
                    } w-[96px]`}
                  >
                    {getTier(listing.traits)}
                  </p>
                  <p className="flex flex-row relative">
                    <p className="text-slate-500 text-sm">Team</p>
                    <p className="right-0 absolute text-lg">{listing.traits}</p>
                  </p>
                  <p className="flex flex-row relative">
                    <p className="text-slate-500 text-sm">Rarity</p>
                    <p className="right-0 absolute text-lg">
                      {findRarity(listing.traits)}
                    </p>
                  </p>
                  <p className="flex flex-row relative">
                    <p className="text-slate-500 text-sm">ID</p>
                    <p className="right-0 absolute text-lg">
                      #{listing.tokenId}
                    </p>
                  </p>
                  <p className="flex flex-row relative">
                    <p className="text-slate-500 text-sm">Price</p>
                    <p className="right-0 absolute text-lg flex flex-row">
                      <img className="max-h-[24px] mr-2" src={BUSD} />
                      {listing.price / 10 ** 18}
                    </p>
                  </p>
                </Box>
                <Box className="bg-black w-full ">
                  {currentAccount ? (
                    currentAccount == listing.creator ? (
                      <div>
                        <button
                          className="rounded-2xl  
                bg-gradient-to-r from-teal-200 via-cyan-600 
                via-purple-500 to-pink-500 w-full"
                          onClick={() => {
                            setShowModalUpdate(true);
                          }}
                        >
                          <div className="m-0.5 py-4 px-[102px] bg-black rounded-2xl ">
                            <div className="text-white text-base">
                              Change Price
                            </div>
                          </div>
                        </button>
                        {showModalUpdate && (
                          <Modal
                            open={showModalUpdate}
                            onClose={() => setShowModalUpdate(false)}
                            className="bg-opacity-64 bg-[191D24] 
                        bg-blur-sm backdrop-blur-sm bg-cover"
                          >
                            <Box
                              className="h-[552px] w-[632px] bg-black 
                          mt-[120px] mx-auto pt-[40px] px-[40px] 
                          pb-[64px] flex flex-col space-y-[40px]
                          "
                            >
                              <div
                                className="w-full h-full
                              flex flex-col gap-[40px] text-white"
                              >
                                <div>Change Price</div>
                                <form>
                                  <label class="block2">
                                    <span className="block2 text-sm text-slate-500 pl-3">
                                      Enter Price(BUSD)
                                    </span>
                                    <input
                                      type="text"
                                      value={enteredPrice}
                                      onChange={handleInput}
                                      className="bg-black border border-slate-700 w-full
                                      rounded-lg h-[48px] px-[16px]"
                                    ></input>
                                    <span
                                      className="block text-sm text-slate-500 pt-[16px]
                                    flex flex-row relative w-full"
                                    >
                                      <span>Est</span>
                                      <span className="right-0 absolute">
                                        {findValue(listing.traits)}
                                      </span>
                                    </span>
                                  </label>
                                </form>
                                <span className="flex flex-col gap-[16px] text-sm text-slate-500">
                                  <div>
                                    Listing is FREE! When the sale succeeds, the
                                    following fees will occur.
                                  </div>
                                  <div className="w-full relative flex flex-row">
                                    <div>Marketplace Fee</div>
                                    <div className=" absolute right-0 text-white">
                                      5%
                                    </div>
                                  </div>
                                  <div className="w-full relative flex flex-row">
                                    <div>You will receive</div>
                                    <div className=" absolute right-0 text-white">
                                      {receivedAmount}
                                    </div>
                                  </div>
                                </span>
                                <button
                                  className="relative flex flex-row justify-center 
                          items-center bg-gradient-to-r from-teal-300 
                          via-cyan-400 via-purple-400 to-pink-500 
                          text-base border-white
                          rounded-2xl border-r-4 
                          border-b-4 py-4 px-6 w-full 
                          hover:via-purple-500 hover:to-pink-500 hover:border-white"
                                  onClick={handleUpdate}
                                >
                                  <div className="absolute top-0 left-0 h-full w-full z-10 rounded-xl border-black border-2"></div>
                                  <div className="relative z-20 text-white">
                                    Update
                                  </div>
                                </button>
                              </div>
                            </Box>
                          </Modal>
                        )}
                        <button
                          className="rounded-2xl w-full mt-[16px]"
                          onClick={handleUnlist}
                        >
                          <div className="m-0.5 py-4 px-[102px] bg-black rounded-2xl ">
                            <div
                              className="text-transparent text-base 
                              bg-gradient-to-r from-teal-300 via-cyan-400 
                via-purple-500 to-pink-500 w-ful bg-clip-text"
                            >
                              Cancel Listing
                            </div>
                          </div>
                        </button>
                      </div>
                    ) : currentAccount == listing.owner ? (
                      <div>
                        <button
                          className="relative flex flex-row justify-center 
                    items-center bg-gradient-to-r from-teal-200 
                    via-cyan-300 via-purple-400 to-pink-400 
                    text-base border-white
                    rounded-2xl border-r-4 
                    border-b-4 py-3 px-6 w-full
                    hover:via-purple-500 hover:to-pink-500 hover:border-white"
                          onClick={() => {
                            setShowModalSell(true);
                          }}
                        >
                          <div className="absolute top-0 left-0 h-full w-full z-10 rounded-xl border-black border-2"></div>
                          <div className="relative z-20 text-white">Sell</div>
                        </button>
                        {showModalSell && (
                          <Modal
                            open={showModalSell}
                            onClose={() => setShowModalSell(false)}
                            className="bg-opacity-64 bg-[191D24] 
                        bg-blur-sm backdrop-blur-sm bg-cover"
                          >
                            <Box
                              className="h-[552px] w-[632px] bg-black 
                          mt-[120px] mx-auto pt-[40px] px-[40px] 
                          pb-[64px] flex flex-col space-y-[40px]
                          "
                            >
                              <div
                                className="w-full h-full
                              flex flex-col gap-[40px] text-white"
                              >
                                <div>Sell NFT</div>
                                <form>
                                  <label class="block">
                                    <span className="block text-sm text-slate-500 pl-3">
                                      Enter Price(BUSD)
                                    </span>
                                    <input
                                      type="text"
                                      value={enteredPrice}
                                      onChange={handleInput}
                                      className="bg-black border border-slate-700 w-full
                                      rounded-lg h-[48px] px-[16px]"
                                    ></input>
                                    <span
                                      className="block text-sm text-slate-500 pt-[16px]
                                    flex flex-row relative w-full"
                                    >
                                      <span>Est</span>
                                      <span className="right-0 absolute">
                                        {findValue(listing.traits)}
                                      </span>
                                    </span>
                                  </label>
                                </form>
                                <span className="flex flex-col gap-[16px] text-sm text-slate-500">
                                  <div>
                                    Listing is FREE! When the sale succeeds, the
                                    following fees will occur.
                                  </div>
                                  <div className="w-full relative flex flex-row">
                                    <div>Marketplace Fee</div>
                                    <div className=" absolute right-0 text-white">
                                      5%
                                    </div>
                                  </div>
                                  <div className="w-full relative flex flex-row">
                                    <div>You will receive</div>
                                    <div className=" absolute right-0 text-white">
                                      {receivedAmount}
                                    </div>
                                  </div>
                                </span>
                                <button
                                  className="relative flex flex-row justify-center 
                          items-center bg-gradient-to-r from-teal-300 
                          via-cyan-400 via-purple-400 to-pink-500 
                          text-base border-white
                          rounded-2xl border-r-4 
                          border-b-4 py-4 px-6 w-full 
                          hover:via-purple-500 hover:to-pink-500 hover:border-white"
                                  onClick={handleSell}
                                >
                                  <div className="absolute top-0 left-0 h-full w-full z-10 rounded-xl border-black border-2"></div>
                                  <div className="relative z-20 text-white">
                                    Sell
                                  </div>
                                </button>
                              </div>
                            </Box>
                          </Modal>
                        )}
                      </div>
                    ) : isApproved ? (
                      <button
                        className="relative flex flex-row justify-center 
                    items-center bg-gradient-to-r from-teal-200 
                    via-cyan-300 via-purple-400 to-pink-400 
                    text-base border-white
                    rounded-2xl border-r-4 
                    border-b-4 py-3 px-6 w-full
                    hover:via-purple-500 hover:to-pink-500 hover:border-white"
                        onClick={handleBuy}
                      >
                        <div className="absolute top-0 left-0 h-full w-full z-10 rounded-xl border-black border-2"></div>
                        <div className="relative z-20 text-white">Buy</div>
                      </button>
                    ) : (
                      <button
                        className="relative flex flex-row justify-center 
                    items-center bg-gradient-to-r from-teal-200 
                    via-cyan-300 via-purple-400 to-pink-400 
                    text-base border-white
                    rounded-2xl border-r-4 
                    border-b-4 py-3 px-6 w-full
                    hover:via-purple-500 hover:to-pink-500 hover:border-white"
                        onClick={handleApprove}
                      >
                        <div className="absolute top-0 left-0 h-full w-full z-10 rounded-xl border-black border-2"></div>
                        <div className="relative z-20 text-white">
                          Approve For All
                        </div>
                      </button>
                    )
                  ) : (
                    <button
                      className="rounded-2xl  
                bg-gradient-to-r from-teal-200 via-cyan-300 
                via-purple-400 to-pink-400 w-full"
                      onClick={connectWallet}
                    >
                      <div className="m-0.5 py-4 px-[102px] bg-black rounded-2xl ">
                        <div className="text-white text-base">
                          Connect Wallet
                        </div>
                      </div>
                    </button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default SingleCard;
