import { ethers, providers } from "ethers";
import { useState, useEffect, useRef, useContext } from "react";
import Web3Modal from "web3modal";
const { address, abi } = require("../Marketplace.json");
import { DataContext } from "../components/dataProvider";

const ConnectWallet = () => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [result, setResult] = useState(null);
  const [data, setData] = useContext(DataContext);
  const [walletConnected, setWalletConnected] = useState(false);

  const connectToMetaMask = async () => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request permission to connect to MetaMask
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        setProvider(provider);

        // Get the user's selected account address
        const accounts = await provider.listAccounts();
        setSelectedAddress(accounts[0]);
        setWalletConnected(true);

        // Set up contract instance using the address and ABI
        const contract = new ethers.Contract(
          address,
          abi,
          provider.getSigner()
        );
        setContract(contract);

        setData({ provider: provider, contract: contract });
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const conditionalBtn = () => {
    if (walletConnected) {
      return (
        <div className="h-full w-full">
          <button className="mr-4 h-10 overflow-hidden w-44 border border-[#03480f] p-1 rounded-lg  transition ease-in-out  hover:scale-110 hover:bg-[#d43680] hover:border-[#d43680]">
            {selectedAddress}
          </button>
        </div>
      );
    } else {
      return (
        <div className="h-full w-full">
          <button
            className="mr-4 h-10 w-44 border border-[#03480f] p-1 rounded-lg  transition ease-in-out  hover:scale-110 hover:bg-[#d43680] hover:border-[#d43680]"
            onClick={connectToMetaMask}
          >
            Connect Wallet
          </button>
        </div>
      );
    }
  };

  return (
    <div className="h-full w-full">
      {/* <button
        className="mr-4 h-10 w-44 border border-[#03480f] p-1 rounded-lg  transition ease-in-out  hover:scale-110 hover:bg-[#d43680] hover:border-[#d43680]"
        onClick={connectWallet}
      >
        Connect Wallet
      </button> */}
      {conditionalBtn()}
    </div>
  );
};

export default ConnectWallet;
