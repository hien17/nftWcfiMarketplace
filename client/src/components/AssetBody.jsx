import React, { useContext, useEffect, useState } from "react";
import { Box, Select, Text } from "@chakra-ui/react";
import { Context } from "../context/Context.jsx";

const AssetBody = () => {
  const {
    getAllNFTs,
  } = useContext(Context);
  const [listings, setListings] = useState(false);

  useEffect(() => {
    getAllNFTs()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  }, [getAllNFTs]);

  const getListings = (index) => {
    if (listings != []) {
      return listings[index];
    }
  };
  return (
    <div className="w-screen h-[3364px] bg-black flex flex-col gap-[40px]">
      <Box className="text-white absolute top-[152px] left-[132px] right-[132px] flex flex-row">
        <p className="text-left">Items (Total 90000)</p>
        <div className="absolute right-0 flex flex-row">
          <button className="py-[12px] px-[16px] border border-slate-800 rounded-xl">
            Filter
          </button>
        </div>
      </Box>
      {/* //wrap of items */}
      <Box
        className="grid grid-cols-4 gap-4 
        absolute left-[132px] right-[132px]
       top-[240px] h-fit rounded-xl border border-slate-500
       "
      >
      </Box>
    </div>
  );
};

export default AssetBody