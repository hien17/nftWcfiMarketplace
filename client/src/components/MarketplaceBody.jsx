import React from "react";
import Information from "./Information";
import { Box, Select, Text } from "@chakra-ui/react";
const MarketplaceBody = () => {
  return (
    <div className="w-screen h-screen bg-black flex flex-col gap-[40px]">
      
      <Box
        className="rounded-lg bg-black flex flex-col 
      items-start p-[40px] border border-slate-700
      absolute h-[220px] left-[132px] right-[132px] top-[152px]"
      >
        <div className="text-white h-full w-full ">
          <div className="flex flex-row gap-[24px] pb-[40px]">
            <p
              className="bg-gradient-to-r from-teal-200 via-cyan-300 
      via-purple-400 to-pink-400 text-transparent 
        bg-clip-text underline
        items-start text-left underline-offset-8"
            >
              Last 24h
            </p>
            <p className="text-slate-500">3D</p>
            <p className="text-slate-500">7D</p>
            <p className="text-slate-500">1M</p>
          </div>
          <div className="flex flex-row">
            <div className="text-left">
              <p className="pb-[8px] text-sm text-slate-500">Total Listed</p>
              <p>1.028</p>
            </div>
            <div className="text-left justify-center mx-auto">
              <p className="pb-[8px] text-sm text-slate-500">
                Total Volume (BUSD)
              </p>
              <p>6,234,000.000</p>
            </div>
            <div className="text-left">
              <p className="pb-[8px] text-sm text-slate-500">Total Sold</p>
              <p>748</p>
            </div>
          </div>
        </div>
      </Box>
      <Box className="text-white absolute top-[412px] left-[132px] right-[132px] flex flex-row">
        <p className="text-left">Items (Total 90000)</p>
        <div className="absolute right-0 flex flex-row">
          <button className="absolute right-[200px] ">
          <Select className="bg-black border border-slate-500 py-[12px] pl-[16px] rounded-xl" w={"12rem"} color={"white"}>
                    <option value='option1' >Newest</option>
                    <option value='option2'>Price: high to low</option>
                    <option value='option3'>Price: low to high</option>
                </Select>
          </button>
          <button className="py-[12px] px-[16px] border border-slate-800 rounded-xl">
              Filter
          </button>
          </div>
      </Box>
    </div>
  );
};

export default MarketplaceBody;
