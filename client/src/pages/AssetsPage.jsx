import React from "react";
import { ContextProvider } from "../context/Context.jsx";
import { NavbarAssets,AssetBody } from "../components";

const AssetsPage = () => {
  return (
    <ContextProvider>
      <div className="">
        <NavbarAssets></NavbarAssets>
        <AssetBody></AssetBody>
      </div>
    </ContextProvider>
  );
};


export default AssetsPage;
