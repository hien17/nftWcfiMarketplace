import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context.jsx";
import BUSD from "/Image/BUSD.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/system/Box";
import { Button } from "@mui/material";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants.js";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseEther } from "viem";
import { useMoralis, useWeb3Contract } from "react-moralis";

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
const findRarity = (name) => {
  const arrays = [tier1Array, tier2Array, tier3Array, tier4Array];

  for (const array of arrays) {
    const obj = array.find((obj) => obj.name === name);
    if (obj) {
      return obj.rarity;
    }
  }
  return null;
};
const findValue = (name) => {
  const arrays = [tier1Array, tier2Array, tier3Array, tier4Array];

  for (const array of arrays) {
    const obj = array.find((obj) => obj.name === name);
    if (obj) {
      return obj.value;
    }
  }
  return null;
};
const getTier = (traitName) => {
  const arrays = [tier1Array, tier2Array, tier3Array, tier4Array];

  for (let i = 0; i < arrays.length; i++) {
    const array = arrays[i];
    const obj = array.find((obj) => obj.name === traitName);
    if (obj) {
      return `Tier ${tierNumber[i]}`;
    }
  }

  return null;
};

const SingleCard = ({ listing }) => {
  const {
    currentAccount,
    connectWallet,
    contractAddress,
    marketplaceAddress,
    marketplaceABI,
  } = useContext(Context);
  const { user, enableWeb3, isWeb3Enabled, account, isWeb3EnableLoading } =
    useMoralis();
  // var isApprovalForAllNFT = isApprovalForAll();
  // console.log(isApprovalForAll());

  var convertTierToColor = {
    "Tier 1":
      "bg-gradient-to-r from-teal-200 via-cyan-300 via-purple-400 to-pink-400 text-transparent bg-clip-text",
    "Tier 2": "text-amber-400",
    "Tier 3": "text-blue-600",
    "Tier 4": "text-slate-400",
  };
  var convertTierToBorderColor = {
    "Tier 1":
      "bg-gradient-to-r p-[2px] from-[#80E8DD] via-[#7CC2F6] to-[#D855A6]",
    "Tier 2": "bg-amber-400 p-[2px]",
    "Tier 3": "bg-blue-600 p-[2px]",
    "Tier 4": "bg-slate-400 p-[2px]",
  };
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
  const closeAllFunc = () => {
    setTimeout(() => {
      window.location.reload();
    }, 4000);
  };

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
    try {
      await listNFT({
        onSuccess: () => {
          console.log("LIST NFT SUCCESSFULL !");
          closeAllFunc();
        },
        onError: (error) => console.log(error),
      });
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
    try {
      await unlistNFT({
        onSuccess: () => {
          console.log("UNLIST NFT SUCCESSFULL !");
          closeAllFunc();
        },
        onError: (error) => console.log(error),
      });
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
    try {
      await buyNFT({
        onSuccess: () => {
          console.log("BUY NFT SUCCESSFULL !");
          closeAllFunc();
        },
        onError: (error) => console.log(error),
      });
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
    try {
      await updateListing({
        onSuccess: () => {
          console.log("UPDATE PRICE SUCCESSFULL !");
          closeAllFunc();
        },
        onError: (error) => console.log(error),
      });
    } catch (error) {
      console.error("Error Update NFT:", error);
    }
  };
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
    try {
      await setApprovalForAll({
        onSuccess: () => {
          console.log("APPROVE SUCCESSFULL !");
          closeAllFunc();
        },
        onError: (error) => console.log(error),
      });
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
