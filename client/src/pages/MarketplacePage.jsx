import React from "react";
import { ContextProvider } from "../context/Context.jsx";
import { NavbarMarketplace, MarketplaceBody } from "../components";
const MarketplacePage = () => {
  return (
    <ContextProvider>
      <div className="w-screen h-screen bg-black  top-0 bottom-0 left-0 right-0">
        <NavbarMarketplace></NavbarMarketplace>
        <MarketplaceBody></MarketplaceBody>
      </div>
    </ContextProvider>
  );
};

export default MarketplacePage;
