import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context.jsx";
import BUSD from "/Image/BUSD.png";
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
const SingleCard = ({ listing }) => {
  const {
    currentAccount,
    connectWallet,
    handleMint,
    showModal,
    setShowModal,
    mintedNftDetails,
    nftId,
    listNFT,
    getListedNFTs,
    marketplaceAddress,
    getTraitsFromTokenId,
  } = useContext(Context);
  var tokenId = listing.tokenId;
  const [traits, setTraits] = useState(false);
  useEffect(() => {
    getTraitsFromTokenId(tokenId)
      .then((data) => {
        setTraits(data);
      })
      .catch((err) => console.error(err));
  }, [tokenId]);

  return (
    <div className="border border-slate-800 bg-[#0E1114] rounded-lg h-fit">
      <div
        className="w-full h-[464px] rounded-lg 
      bg-black flex justify-center"
      >
        <img
          className="object-contain 
        rounded-lg scale-75"
          src={`/Image/Tiers/${traits}.png`}
          alt="single-card"
        />
      </div>

      <div className="flex flex-col pt-[24px]  pl-[24px] pr-[24px] pb-[32px] rounded-lg">
        <div className="flex flex-row justify-between mb-[16px] flex-wrap text-left">
          <div className="w-[48%]">
            <p className="text-sm text-slate-500 ">Team</p>
            <p className="text-white">{traits}</p>
          </div>
          <div className="w-[48%]">
            <p className="text-sm text-slate-500">Rarity</p>
            <p className="text-white">{findRarity(traits)}</p>
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
  );
};

export default SingleCard;
