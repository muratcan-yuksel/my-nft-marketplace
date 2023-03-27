import { ethers, providers } from "ethers";
import { useState, useEffect, useRef } from "react";
import Web3Modal from "web3modal";

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

  const disconnectWallet = async () => {
    try {
      // Disconnect the wallet provider
      await web3ModalRef.current.clearCachedProvider();
      // Reset the provider state to null
      setProvider(null);
      // Set the walletConnected state to false
      setWalletConnected(false);
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
      connectWallet();
    }
  }, [walletConnected]);

  return <div>hey</div>;
};

export default Index;
