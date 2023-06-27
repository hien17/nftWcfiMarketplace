import React from "react";
import "../App.css";
const images = [];
const Tier = ({ tierNumber, tierArray }) => {
  return (
    <div key={tierNumber}>
      <div className="p-[40px] flex flex-col flex-start w-full">
        <div className=" pb-[24px] text-left ">
          <a
            className={`text-xl ${
              tierNumber === 1
                ? `bg-gradient-to-r 
              from-teal-300 via-purple-400
              to-pink-400 text-transparent bg-clip-text`
                :tierNumber===2 ? `text-amber-400` :tierNumber===3? `text-blue-600` :`text-slate-400`
            }  
               `}
          >
            Tier {tierNumber}
          </a>
        </div>
        <div className="gap-[24px] pb-[24px]">
          {tierArray.map((tier, index) => (
            <div key={`${tierNumber}-${index}`}>
              <div className="h-[42px] ">
                <div className="flex flex-row w-full relative">
                  <div className="max-h-[40px] max-w-[40px] pr-[16px] flex-row justify-start">
                    <img
                      src={`/Image/Flag/tier${tierNumber}/${tier.name}.png`}
                    />
                  </div>
                  <div className="flex flex-col justify-start">
                    <div className="text-base text-left">{tier.name}</div>
                    <div className="text-xs text-slate-500 text-left">
                      Minted: {tier.minted}
                    </div>
                  </div>
                  <div className="flex flex-col justify-end absolute right-0">
                    <div className="text-base ">{tier.rarity}</div>
                    <div className="text-xs text-slate-500 ">{tier.value}</div>
                  </div>
                </div>
              </div>
              <div className="h-[6px]"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tier;
