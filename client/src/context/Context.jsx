import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { marketplaceABI, marketplaceAddress } from "../utils/constantsMarket";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useQuery, gql } from '@apollo/client'
// import { useHistory } from 'react-router-dom';

export const Context = React.createContext();
const { ethereum } = window;
const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return transactionsContract;
};
const createMarketplaceContract = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const Contract = new ethers.Contract(
    marketplaceAddress,
    marketplaceABI,
    signer
  );
  return Contract;
};

export const ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contractInstance, setContractInstance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mintedNftDetails, setMintedNftDetails] = useState(null);
  const [nftId, setNftId] = useState(0);

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };
 const [txHash,setTxHash] = useState("");
 const navigateToBscScan = (txHash) => {
  window.location.href = `https://testnet.bscscan.com/tx/${txHash}`;
};

  
  // const handleMint = async () => {
  //   try {
  //     await contractInstance.safeMint({
  //       value: ethers.utils.parseEther("0.0001"),
  //     });
  //     // Add event listener for Mint event
  //     contractInstance.on("Mint", handleMintEvent);
  //     // Remove event listener on unmount
  //     return () => {
  //       contractInstance.off("Mint", handleMintEvent);
  //       handleShowModal(tokenId);
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //mintNFT
  const {
    runContractFunction: mintNFT,
    data: dataMintNFT,
    isLoadingMintNFT,
    isFetchingMintNFT,
  } = useWeb3Contract({
    abi: contractABI,
    contractAddress: contractAddress,
    functionName: "safeMint",
    msgValue: ethers.utils.parseUnits('0.0001', 'ether').toString(),
  });
  const handleMintNFT = async () => {
    try {
      await mintNFT({
        onSuccess: (tx) => tx.wait().then(() =>  {
        //set tx hash in order to view bscan 
        setTxHash(tx.hash);
        // Add event listener for Mint event
        contractInstance.on("Mint", handleMintEvent);
        // Remove event listener on unmount
        return () => {
        contractInstance.off("Mint", handleMintEvent);
        handleShowModal(tokenId);
      };
        }),
        onError: (error) => console.log(error),
      });
    } catch (error) {
      console.error("Error Mint NFT:", error);
    }
  };
  const handleMintEvent = async (date, from, to, tokenId) => {
    console.log(`New NFT minted with tokenId: ${tokenId}`);
    console.log(`From: ${from}`);
    console.log(`To: ${to}`);
    // Get the metadata for the newly minted NFT
    const metadata = await contractInstance.getMetadata(tokenId);
    console.log(`Metadata for tokenId ${tokenId}:`, metadata);
    // Show details of the minted NFT in a Modal
    handleShowModal(tokenId);
  };
  const handleShowModal = async (tokenId) => {
    // Get the metadata for the minted NFT
    const metadata = await contractInstance.getMetadata(tokenId);

    // Set the minted NFT details and open the Modal
    setMintedNftDetails(metadata);
    setNftId(tokenId.toNumber());
    setShowModal(true);
  };
  const [marketplaceContract, setMarketplaceContract] = useState(null);
  const createMarketplaceInstance = () => {
    try {
      setMarketplaceContract(createMarketplaceContract());
    } catch (error) {
      console.log(error);
    }
  };

  const listNFT = async (tokenId, price) => {
    try {
      const listingPrice = await marketplaceContract.getListingPrice();
      // Approve the marketplace contract to transfer the NFT
      await contractInstance.approve(marketplaceAddress, tokenId);
      // List the NFT for sale on the marketplace
      await marketplaceContract.listNFT(tokenId, price, {
        value: listingPrice,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getListedNFTs = async () => {
    try {
      return await marketplaceContract.getListedNFTs();
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
  // const [traits,setTraits] = useState([]);
  const getTraitsFromTokenId = async (tokenId) => {
    try {
      const metadata = await contractInstance.getMetadata(tokenId);
      return metadata.traits;
    } catch (error) {
      console.log(error);
    }
  };
  const getAccountBalance = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(currentAccount);
      return ethers.utils.formatEther(balance);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  // get nft in my assets
  async function getAllNFTs() {
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const balance = await contract.methods
      .balanceOf(web3.eth.defaultAccount)
      .call();
    const nfts = [];

    for (let i = 0; i < balance; i++) {
      const tokenId = await contract.methods
        .tokenOfOwnerByIndex(web3.eth.defaultAccount, i)
        .call();
      const nft = await contract.methods.getNFT(tokenId).call(); // Replace with your own NFT data retrieval function
      nfts.push(nft);
    }

    return nfts;
  }
  const isApprovalForAll = async () => {
    setContractInstance(createEthereumContract());
    return await contract.isApprovalForAll().call();
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    setContractInstance(createEthereumContract());
    createMarketplaceInstance();
    getTraitsFromTokenId(nftId);
  }, []);
  // const getTraits = (tokenId) =>{
  //   if (traits!=false){
  //     console.log(traits);
  //     return traits;
  //   }
  // }

  //listen event change account => set current account(can reload if needed)
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      setCurrentAccount(accounts[0]);
      // window.location.reload();
    };
    ethereum?.on("accountsChanged", handleAccountsChanged);
    return () => {
      ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, [setCurrentAccount]);

  // const [listings, setListings] = useState(false);
  // const GET_ITEM_MK = gql`
  //       {
  //         tokens(
  //           first: 20
  //           where: {
  //             owner: "${marketplaceAddress}"
  //           }
  //         ) {
  //           id
  //           approved
  //           tokenId
  //           owner
  //           creator
  //           price
  //           traits
  //         }
  //       }
  //   `;

  // const { loading, error, data, refetch } = useQuery(GET_ITEM_MK);

  // useEffect(() => {
  //   if (!loading) {
  //     setListings(
  //       data.tokens.map((token) => {
  //         return token;
  //       })
  //     );
  //   }
  // }, [loading]);

  // const getListings = (index) => {
  //   if (listings != []) {
  //     return listings[index];
  //   }
  // };

  return (
    <Context.Provider
      value={{
        connectWallet,
        currentAccount,
        setCurrentAccount,
        // handleMint,
        handleMintNFT,
        showModal,
        handleShowModal,
        setShowModal,
        mintedNftDetails,
        contractInstance,
        nftId,
        listNFT,
        getListedNFTs,
        marketplaceAddress,
        contractAddress,
        getTraitsFromTokenId,
        getAccountBalance,
        getAllNFTs,
        isApprovalForAll,
        marketplaceABI,
        contractABI,
        navigateToBscScan,
        txHash,
      }}
    >
      {children}
    </Context.Provider>
  );
};
