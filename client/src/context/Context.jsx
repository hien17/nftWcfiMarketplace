import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { marketABI, marketAddress } from "../utils/constantsMarket";

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
}
  const createMarketplaceContract = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const signer = provider.getSigner();
    const Contract = new ethers.Contract(
      marketAddress,
      marketABI,
      signer
    );

  return Contract;
};

export const ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contractInstance, setContractInstance] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [mintedNftDetails, setMintedNftDetails] = useState(null);
  const [nftId,setNftId] = useState(0);
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
  const handleMint = async () => {
    try {
      await contractInstance.safeMint({
        value: ethers.utils.parseEther("0.0001"),
      });
      // Add event listener for Mint event
      contractInstance.on("Mint", handleMintEvent);

      // Remove event listener on unmount
      return () => {
        contractInstance.off("Mint", handleMintEvent);
        handleShowModal(tokenId);
      };
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowModal = async (tokenId) => {
    // Get the metadata for the minted NFT
    const metadata = await contractInstance.getMetadata(tokenId);

    // Set the minted NFT details and open the Modal
    setMintedNftDetails(metadata);
    setNftId(tokenId.toNumber());
    setShowModal(true);
  };
  useEffect(() => {
    checkIfWalletIsConnect();
    setContractInstance(createEthereumContract());
  }, []);

  return (
    <Context.Provider
      value={{
        connectWallet,
        currentAccount,
        handleMint,
        showModal,
        handleShowModal,
        setShowModal,
        mintedNftDetails,
        nftId,
      }}
    >
      {children}
    </Context.Provider>
  );
};
