import React from "react";

export const tier1Array = [
  { name: "Brazil", minted: "84", rarity: "0.08%", value: "≈$96,000" },
  { name: "France", minted: "104", rarity: "0.10%", value: "≈$77,538" },
  { name: "England", minted: "112", rarity: "0.11%", value: "≈$72,000" },
  { name: "Spain", minted: "104", rarity: "0.14%", value: "≈$57,600" },
  { name: "Germany", minted: "118", rarity: "0.19%", value: "≈$42,894" },
  { name: "Argentina", minted: "118", rarity: "0.19%", value: "≈$42,894" },
  { name: "Belgium", minted: "226", rarity: "0.22%", value: "≈$5,681" },
  { name: "Portugal", minted: "226", rarity: "0.22%", value: "≈$35,681" },
];
export const tier2Array = [
  { name: "Netherlands", minted: "264", rarity: "0.26%", value: "≈$30,545" },
  { name: "Denmark", minted: "526", rarity: "0.52%", value: "≈$15,331" },
  { name: "Croatia", minted: "658", rarity: "0.65%", value: "≈$12,255" },
  { name: "Uruguay", minted: "940", rarity: "0.93%", value: "≈$8,579" },
  { name: "Poland", minted: "1,221", rarity: "1.21%", value: "≈$6,604" },
  { name: "Senegal", minted: "1,221", rarity: "1.21%", value: "≈$6,604" },
  { name: "United States", minted: "1,503", rarity: "1.49%", value: "≈$5,365" },
  { name: "Serbia", minted: "1,503", rarity: "1.49%", value: "≈$5,365" },
];
export const tier3Array = [
  { name: "Switzerland", minted: "1,503", rarity: "1.49%", value: "≈$5,365" },
  { name: "Mexico", minted: "1,879", rarity: "1.86%", value: "≈$4,292" },
  { name: "Wales", minted: "1,879", rarity: "1.86%", value: "≈$4,292" },
  { name: "Ghana", minted: "2,818", rarity: "2.80%", value: "≈$2,862" },
  { name: "Ecuador", minted: "2,818", rarity: "2.80%", value: "≈$2,146" },
  { name: "Morocco", minted: "1,3,758", rarity: "3.73%", value: "≈$2,146" },
  { name: "Cameroon", minted: "4,698", rarity: "4.66%", value: "≈$1,716" },
  { name: "Canada", minted: "4,698", rarity: "4.66%", value: "≈$1,716" },
];
export const tier4Array = [
  { name: "Japan", minted: "4,698", rarity: "4.66%", value: "≈$1,716" },
  { name: "Qatar", minted: "4,698", rarity: "4.66%", value: "≈$1,716" },
  { name: "Tunisia", minted: "5,367", rarity: "5,59%", value: "≈$1,431" },
  { name: "South Korea", minted: "7,516", rarity: "7,46%", value: "≈$1,073" },
  { name: "Australia", minted: "7,516", rarity: "7,46%", value: "≈$1,073" },
  { name: "Iran", minted: "9,395", rarity: "9,32%", value: "≈$858" },
  { name: "Saudi Arabia", minted: "9,395", rarity: "9,32%", value: "≈$858" },
  { name: "Costa Rica", minted: "18,790", rarity: "18,64%", value: "≈$429" },
];
export const tierNumber = [1, 2, 3, 4];
export const findRarityAndValue = (name) => {
  const arrays = [tier1Array, tier2Array, tier3Array, tier4Array];

  for (const array of arrays) {
    const obj = array.find((obj) => obj.name === name);
    if (obj) {
      return { rarity: obj.rarity, value: obj.value };
    }
  }

  return null;
};
export const findRarity = (name) => {
  const arrays = [tier1Array, tier2Array, tier3Array, tier4Array];

  for (const array of arrays) {
    const obj = array.find((obj) => obj.name === name);
    if (obj) {
      return obj.rarity;
    }
  }
  return null;
};
export const findValue = (name) => {
  const arrays = [tier1Array, tier2Array, tier3Array, tier4Array];

  for (const array of arrays) {
    const obj = array.find((obj) => obj.name === name);
    if (obj) {
      return obj.value;
    }
  }
  return null;
};
export const getTier = (traitName) => {
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

export const convertTierToColor = {
  "Tier 1":
    "bg-gradient-to-r from-teal-200 via-cyan-300 via-purple-400 to-pink-400 text-transparent bg-clip-text",
  "Tier 2": "text-amber-400",
  "Tier 3": "text-blue-600",
  "Tier 4": "text-slate-400",
};
export const convertTierToBorderColor = {
  "Tier 1":
    "bg-gradient-to-r p-[2px] from-[#80E8DD] via-[#7CC2F6] to-[#D855A6]",
  "Tier 2": "bg-amber-400 p-[2px]",
  "Tier 3": "bg-blue-600 p-[2px]",
  "Tier 4": "bg-slate-400 p-[2px]",
};
export default {
  tier1Array,
  tier2Array,
  tier3Array,
  tier4Array,
  tierNumber,
  findRarity,
  findValue,
  findRarityAndValue,
  getTier,
  convertTierToBorderColor,
  convertTierToColor,
};
