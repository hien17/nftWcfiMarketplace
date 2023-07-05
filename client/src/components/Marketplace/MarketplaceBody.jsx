import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context.jsx";
import SingleCard from "../SingleCard.jsx";
import { Box, Select, Text, filter } from "@chakra-ui/react";
import Modal from "@mui/material/Modal";
import { useQuery, gql } from "@apollo/client";
import {
  marketplaceABI,
  marketplaceAddress,
} from "../../utils/constantsMarket.js";
import { AiOutlineClose } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import {
  findRarity,
  findValue,
  getTier,
  convertTierToColor,
  convertTierToBorderColor,
  tier1Array,
  tier2Array,
  tier3Array,
  tier4Array,
  tierNumber,
} from "../Data";
import "../../App.css";
const MarketplaceBody = () => {
  // const { currentAccount, connectWallet,
  //   isApprovalForAll,showToastPending,showToastSuccess } =
  //   useContext(Context);
  const [modalFilter, setModalFilter] = useState(false);
  const [selectedTier, setSelectedTier] = useState(1);
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("100");
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [minPriceBigInt, setMinPriceBigInt] = useState(null);
  const [maxPriceBigInt, setMaxPriceBigInt] = useState(null);
  // ... other code ...

  useEffect(() => {
    if (minPrice) {
      const minPriceBigIntValue = minPrice * 10 ** 18;
      setMinPriceBigInt(minPriceBigIntValue.toString());
    }
    if (maxPrice) {
      const maxPriceBigIntValue = maxPrice * 10 ** 18;
      setMaxPriceBigInt(maxPriceBigIntValue.toString());
    }
  }, [minPrice, maxPrice]);
  const getTierArray = (tier) => {
    switch (tier) {
      case 1:
        return tier1Array;
      case 2:
        return tier2Array;
      case 3:
        return tier3Array;
      case 4:
        return tier4Array;
      default:
        return [];
    }
  };
  const handleCountryChange = (country) => {
    if (selectedCountries.includes(country)) {
      setSelectedCountries(selectedCountries.filter((c) => c !== country));
    } else {
      setSelectedCountries([...selectedCountries, country]);
    }
  };

  const [listings, setListings] = useState(false);
  var GET_ITEM_MK = gql`
        {
          tokens(
            where: {
              owner: "${marketplaceAddress}"
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

  var GET_ITEM_MK_FILTERS = gql`
    query GetTokens($minPriceBigInt: String, $maxPriceBigInt: String, $selectedCountries: [String!]) {
      tokens(
        where: {
          owner: "${marketplaceAddress}"
          price_gte: $minPriceBigInt
          price_lte: $maxPriceBigInt
          traits_in: $selectedCountries
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

  const [query, setQuery] = useState(GET_ITEM_MK);

  // console.log(filtersApplied);
  // console.log(selectedCountries, minPriceBigInt, maxPriceBigInt);
  // console.log(selectedCountries);
  useEffect(() => {
    if (filtersApplied) {
      setQuery(GET_ITEM_MK_FILTERS);
    } else {
      setQuery(GET_ITEM_MK);
    }
  }, [setFiltersApplied, minPrice, maxPrice, selectedCountries]);
  const { loading, error, data, refetch } = useQuery(query, {
    variables: filtersApplied,
  });
  const {
    loading: loadingFilters,
    error: errorFilters,
    data: dataFilters,
    refetch: refetchFilters,
  } = useQuery(GET_ITEM_MK_FILTERS, {
    variables: {
      minPriceBigInt,
      maxPriceBigInt,
      selectedCountries,
    },
  });
  useEffect(() => {
    refetch(filtersApplied);
  }, [filtersApplied, refetch]);
  useEffect(() => {
    if (!filtersApplied) {
      if (!loading) {
        setListings(
          data.tokens.map((token) => {
            return token;
          })
        );
      }
    } else {
      if (!loadingFilters) {
        setListings(
          dataFilters.tokens.map((token) => {
            return token;
          })
        );
      }
    }
  }, [loading, loadingFilters, filtersApplied]);

  const getListings = (index) => {
    if (listings != []) {
      return listings[index];
    }
  };
  useEffect(() => {
    setSelectedTier(selectedTier);
  }, [setSelectedTier]);

  return (
    <div className="w-screen h-[3364px] bg-black flex flex-col gap-[40px]">
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
            <Select
              className="bg-black border border-slate-500 py-[12px] pl-[16px] rounded-xl"
              w={"12rem"}
              color={"white"}
            >
              <option value="option1">Newest</option>
              <option value="option2">Price: high to low</option>
              <option value="option3">Price: low to high</option>
            </Select>
          </button>
          <button
            className="py-[12px] px-[16px] 
          border border-slate-800 rounded-xl"
            onClick={() => setModalFilter(true)}
          >
            Filter
          </button>
          {modalFilter && (
            <Modal
              open={modalFilter}
              onClose={() => setModalFilter(false)}
              className="bg-opacity-64 bg-[191D24] 
          bg-blur-sm backdrop-blur-sm bg-cover"
            >
              <Box
                className="mt-[120px] mx-auto 
            w-[632px]  bg-black
            p-[40px] flex flex-col gap-[40px] text-white"
              >
                <div className="flex flex-row justify-between">
                  <div className="text-lg">Filters</div>
                  <AiOutlineClose
                    className="my-auto "
                    onClick={() => setModalFilter(false)}
                  />
                </div>
                <div className="">
                  <div className="text-base">Price</div>
                  <div className="flex flex-row justify-between text-slate-600 mt-[8px]">
                    <input
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => {
                        setMinPrice(e.target.value);
                      }}
                      className="w-[239px] bg-black 
                    border border-slate-800 rounded-lg px-[16px] py-[12px]"
                    />
                    <div className="m-auto">To</div>
                    <input
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => {
                        setMaxPrice(e.target.value);
                      }}
                      className="w-[239px] bg-black 
                    border border-slate-800 rounded-lg px-[16px] py-[12px]"
                    />
                  </div>
                </div>
                <form className="">
                  <div>National Team</div>

                  <div className="flex flex-row justify-between gap-[24px]">
                    <div className="w-[180px] flex flex-col gap-[24px] mt-[16px]">
                      {tierNumber.map((tier) => (
                        <div key={tier}>
                          <button
                            type="button"
                            onClick={() => setSelectedTier(tier)}
                            className={`text-sm ${
                              tier === selectedTier
                                ? "bg-gradient-to-r from-teal-300 via-cyan-300 via-purple-400 to-pink-400 text-transparent bg-clip-text "
                                : ""
                            }`}
                          >
                            Tier {tier}
                          </button>
                        </div>
                      ))}
                    </div>
                    <div
                      className="w-[348px] text-left mt-[16px]
                     flex flex-col gap-[8px]"
                    >
                      {getTierArray(selectedTier).map((country) => (
                        <div
                          key={country.name}
                          className=" flex flex-row relative"
                        >
                          <img
                            className="w-[32px] h-[32px] mr-[8px]"
                            src={`/Image/Flag/tier${selectedTier}/${country.name}.png`}
                          />
                          <div className="">{country.name}</div>
                          {/* <input
                            type="checkbox"
                            value={country.name}
                            checked={selectedCountry === country.name}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                          /> */}
                          <div className="scale-150 absolute right-0 px-[8px]">
                            <input
                              type="checkbox"
                              className="checkbox scale-125 "
                              value={country.name}
                              checked={selectedCountries.includes(country.name)}
                              onChange={(e) =>
                                handleCountryChange(country.name)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>

                <div className="flex flex-row justify-between gap-[24px]">
                  <div
                    className="rounded-lg  
                bg-gradient-to-r from-teal-200 via-cyan-300 
                via-purple-400 to-pink-400 "
                  >
                    <div className="m-0.5 px-[24px] py-[16px] bg-black rounded-lg ">
                      <button
                        className="text-white text-base"
                        onClick={() => {
                          setMinPrice("0");
                          setMaxPrice("100");
                          setSelectedCountries([]);
                          setFiltersApplied(false);
                          refetch();
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  <button
                    className={`w-full 
                ${
                  minPrice != "0" ||
                  maxPrice != "100" ||
                  selectedCountries != ""
                    ? "bg-gradient-to-r from-teal-200 via-cyan-300 via-purple-400 to-pink-400 text-base border-white rounded-2xl border-r-4 border-b-4 py-3 px-6"
                    : "bg-[#191D24]"
                } rounded-xl text-center text-slate-700
                bg-black bg-opacity-60 backdrop-blur-md`}
                    onClick={() => {
                      setFiltersApplied(true);
                      refetch();
                      setModalFilter(false);
                    }}
                  >
                    <div
                      className={` ${
                        minPrice != "0" ||
                        maxPrice != "100" ||
                        selectedCountries != ""
                          ? "absolute top-0 left-0 h-full w-full z-10 rounded-xl border-black border-2"
                          : ""
                      }`}
                    ></div>
                    <div
                      className={` ${
                        minPrice != "0" ||
                        maxPrice != "100" ||
                        selectedCountries != ""
                          ? "relative z-20 text-white "
                          : ""
                      }`}
                    >
                      Apply
                    </div>
                  </button>
                </div>
              </Box>
            </Modal>
          )}
        </div>
      </Box>
      <ToastContainer />
      {/* //wrap of items */}
      <Box
        className="grid grid-cols-4 gap-4 
        absolute left-[132px] right-[132px]
       top-[500px] h-fit rounded-xl 
      
       "
      >
        {listings &&
          listings.map((listing, index) => (
            <SingleCard key={index} listing={getListings(index)} />
          ))}
      </Box>
    </div>
  );
};

export default MarketplaceBody;
