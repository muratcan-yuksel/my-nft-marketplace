import { ethers, providers } from "ethers";
import { useState, useEffect, useRef } from "react";
import Web3Modal from "web3modal";
const { address, abi } = require("../Marketplace.json");

const Index = () => {
  const [provider, setProvider] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 80001) {
      window.alert("Please connect to Matic Mumbai Testnet");
      throw new Error("Please connect to Matic Mumbai Testnet");
    }
    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
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

  const getAllNFTs = async () => {
    const signer = await getProviderOrSigner(true);
    const contract = new ethers.Contract(address, abi, signer);
    const transaction = await contract.getAllNFTs();
    console.log(transaction);

    const items = await transaction.map(async (item) => {
      const tokenURI = await contract.tokenURI(item.tokenId);
      const metadata = await fetch(tokenURI).then((res) => res.json());
      let price = ethers.utils.formatUnits(item.price.toString(), "ether");
      return { ...metadata, price };
    });
    await console.log(items);
  };

  useEffect(() => {
    if (!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "mumbai",
        cacheProvider: true,
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
    getAllNFTs();
  }, [walletConnected]);

  return <div>home</div>;
};

export default Index;
