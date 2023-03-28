import { ethers, providers } from "ethers";
import { useState, useEffect, useRef } from "react";
import Web3Modal from "web3modal";
const { address, abi } = require("../Marketplace.json");

const ConnectWallet = () => {
  const [provider, setProvider] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();
  const [walletAddress, setWalletAddress] = useState("");

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    const address = await web3Provider.getSigner().getAddress();

    if (chainId !== 80001) {
      window.alert("Please connect to Matic Mumbai Testnet");
      throw new Error("Please connect to Matic Mumbai Testnet");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }

    console.log(address);
    setWalletAddress(address);

    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        cacheProvider: true,
        providerOptions: {},
        disableInjectedProvider: false,
      });
    }
  }, [walletConnected]);

  const conditionalBtn = () => {
    if (walletConnected) {
      return (
        <div className="h-full w-full">
          <button className="mr-4 h-10 overflow-hidden w-44 border border-[#03480f] p-1 rounded-lg  transition ease-in-out  hover:scale-110 hover:bg-[#d43680] hover:border-[#d43680]">
            {walletAddress}
          </button>
        </div>
      );
    } else {
      return (
        <div className="h-full w-full">
          <button
            className="mr-4 h-10 w-44 border border-[#03480f] p-1 rounded-lg  transition ease-in-out  hover:scale-110 hover:bg-[#d43680] hover:border-[#d43680]"
            onClick={connectWallet}
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
