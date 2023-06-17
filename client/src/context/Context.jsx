import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

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

export const ContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [contractInstance, setContractInstance] = useState(null);

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
  const handleMint = async () => {
    try {
      await contractInstance.safeMint({
        value: ethers.utils.parseEther("0.0001"),
      });
      // Listen to the Mint event
      contractInstance.on("Mint", async (date, from, to, tokenId) => {
        console.log(`New NFT minted with tokenId: ${tokenId}`);
        console.log(`From: ${from}`);
        console.log(`To: ${to}`);

        // Get the metadata for the newly minted NFT
        const metadata = await contractInstance.getMetadata(tokenId);
        console.log(`Metadata for tokenId ${tokenId}:`, metadata);
      });
    } catch (error) {
      console.log(error);
    }
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
      }}
    >
      {children}
    </Context.Provider>
  );
};
