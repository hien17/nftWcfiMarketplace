import React from "react";
const tierArray = [
  { name: "Brazil", minted: "1", rarity: "0.08%", value: "≈96,000" },
  { name: "France", minted: "1", rarity: "0.10%", value: "≈77,538" },
  { name: "England", minted: "1", rarity: "0.11%", value: "≈6,000" },
  { name: "Spain", minted: "1", rarity: "0.14%", value: "≈6,000" },
  { name: "Germany", minted: "1", rarity: "0.19%", value: "≈6,000" },
  { name: "Argentina", minted: "1", rarity: "0.19%", value: "≈6,000" },
  { name: "Belgium", minted: "1", rarity: "0.22%", value: "≈6,000" },
  { name: "Portugal", minted: "1", rarity: "0.22%", value: "≈6,000" },
];
const images = [];

// Use require.context to import all PNG files from the image folder
const files = require.context('../image/flag/Tier1', true, /\.png$/);

files.keys().forEach((fileName) => {
  // Use the fileName to get the image path
  const imagePath = files(fileName);

  // Create a new image object and add it to the images array
  const image = <img src={imagePath} alt="My Image" />;
  images.push(image);
});
import {tier1Image} from "../image/Flag/tier1";
const Tier = (tierNumber, tierArray) => {
  return (
    <div>
      <div
        className="text-sm bg-gradient-to-r 
              from-teal-200 via-cyan-300 via-purple-400
               to-pink-400 text-transparent 
               bg-clip-text"
      >
        Tier {tierNumber}
      </div>
      <div>
        {tierArray.map((tier) => {
          //Tier number + 8 line
          <div className="flex flex-col p-10"></div>;
        })}
      </div>
    </div>
  );
};

export default Tier;
