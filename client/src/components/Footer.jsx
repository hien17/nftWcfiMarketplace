import React from "react";
import "../App.css";
import { TbBrandTelegram } from "react-icons/tb";
import { TbBrandTwitter } from "react-icons/tb";
import { TbBrandYoutube } from "react-icons/tb";
import { TbBrandDiscord } from "react-icons/tb";

const Footer = () => {
  return (
    <div className="Footer text-white flex flex-row">
      <div className="contentFooter grid gap-[7.5rem]">
        <div className="menuItemFooter flex text-lg font-blod justify">
          Home <div>&nbsp;&nbsp;&nbsp;</div>/<div>&nbsp;&nbsp;&nbsp;</div>{" "}
          Marketplace <div>&nbsp;&nbsp;&nbsp;</div>/
          <div>&nbsp;&nbsp;&nbsp; </div> Game Mechanics
        </div>
        <div className="flex justify-between flex-row">
          <div className="WCFIFooter text-5xl font-bold text-left">WCFI</div>
          <div className="justify-start">
            <div className="text-base">Find Us On Social</div>
            <div className="socialIconFooter flex gap-[1rem]">
              <TbBrandTwitter />
              <TbBrandTelegram />
              <TbBrandYoutube />
              <TbBrandDiscord />
            </div>
          </div>
        </div>
        <div className="text-sm text-slate-500">
          2022 WCFI All Rights Reversed
        </div>
      </div>
    </div>
  );
};

export default Footer;
