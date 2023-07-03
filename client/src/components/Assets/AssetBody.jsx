import React, { useContext, useEffect, useState } from "react";
import { Box, Select, Text } from "@chakra-ui/react";
import { Context } from "../../context/Context.jsx";
import { useQuery, gql } from "@apollo/client";
import {
  marketplaceABI,
  marketplaceAddress,
} from "../../utils/constantsMarket.js";
import { colors } from "../../constants/colors.js";
import SingleCard from "../SingleCard.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
const AssetBody = () => {
  const [listingMode, setlistingMode] = useState(false);
  const { currentAccount, connectWallet, 
    isApprovalForAll,showToastPending,showToastSuccess } =
    useContext(Context);
  const [reloadCards, setReloadCards] = useState(false);
  const [listings, setListings] = useState(false);
  const offListingModeChange = () => {
    setlistingMode(false);
  };
  const onListingModeChange = () => {
    setlistingMode(true);
  };
  const GET_ITEM = gql`
        {
          tokens(
            first: 20
            where: {
              owner: "${marketplaceAddress}"
              creator: "${currentAccount}"
            }
          ) {
            id
            approved
            tokenId
            owner
            creator
            price
            traits
          }
        }
    `;
  const GET_ITEM2 = gql`
    {
      tokens(
        first: 20
        where: {
          owner: "${currentAccount}"

        }
      ) {
        id
        approved
        tokenId
        owner
        creator
        price
        traits
      }
    }
`;
  var queryItem;
  listingMode ? (queryItem = GET_ITEM) : (queryItem = GET_ITEM2);
  const { loading, error, data, refetch } = useQuery(queryItem, {
    variables: listingMode,
  });

  useEffect(() => {
    if (!loading) {
      setListings(
        data.tokens.map((token) => {
          return token;
        })
      );
    }
  }, [loading, listingMode, refetch]);

  const getListings = (index) => {
    if (listings != []) {
      return listings[index];
    }
  };

  return (
    <div className="w-screen h-[3364px] bg-black flex flex-col gap-[40px]">
      <div className=" text-lg text-white absolute top-[152px] left-[132px] right-[132px] flex flex-row">
        <button
          className={`text-left
        ${!listingMode ? "underline-offset-8 underline" : "text-slate-500"}`}
          onClick={() => offListingModeChange()}
        >
          My Assets
        </button>
        <button
          className={`text-left pl-[24px]
          ${listingMode ? "underline-offset-8 underline" : "text-slate-500"}`}
          onClick={() => onListingModeChange()}
        >
          Listing
        </button>
        {/* <div>
          <button
            className={`text-left pl-[24px]
          ${listingMode ? "underline-offset-8 underline" : "text-slate-500"}`}
            onClick={() => showToastPending()}
          >
            Toast Pending
          </button>
          
        </div>

        <div>
          <button
            className={`text-left pl-[24px]
          ${listingMode ? "underline-offset-8 underline" : "text-slate-500"}`}
            onClick={() => showToastSuccess()}
          >
            Toast Success
          </button>
          <ToastContainer />
        </div> */}
    <ToastContainer/>
        <div className="absolute right-0 flex flex-row">
          <button className="py-[12px] px-[16px] border border-slate-800 rounded-xl">
            Filter
          </button>
        </div>
      </div>
      {/* //wrap of items */}
      <Box
        className="grid grid-cols-4 gap-4 
        absolute left-[132px] right-[132px]
       top-[240px] h-fit rounded-xl  border-slate-500
       "
      >
        {listings &&
          listings.map((listing, index) => (
            <SingleCard key={index} listing={getListings(index)} 
            showToastPending={showToastPending} showToastSuccess={showToastSuccess}/>
          ))}
      </Box>
    </div>
  );
};

export default AssetBody;
