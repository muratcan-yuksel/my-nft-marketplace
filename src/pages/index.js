import { ethers, providers } from "ethers";
import { useState, useEffect, useRef } from "react";
const { address, abi } = require("../Marketplace.json");

const Index = () => {
  const [provider, setProvider] = useState(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const web3ModalRef = useRef();

  const getProviderOrSigner = async (needSigner = false) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner();
    setProvider(provider);
    return needSigner ? signer : provider;
  };

  const getAllNFTs = async () => {
    const signer = await getProviderOrSigner(true);
    const contract = new ethers.Contract(address, abi, signer);
    const transaction = await contract.getAllNFTs();
    console.log(transaction);
    //Fetch all the details of every NFT from the contract and display
    const items = await transaction.map(async (item) => {
      const tokenURI = await contract.tokenURI(item.tokenId);
      const metadata = await fetch(tokenURI).then((res) => res.json());
      let price = ethers.utils.formatUnits(item.price.toString(), "ether");
      return {
        ...metadata,
        price,
        tokenId: item.tokenId,
        owner: item.owner,
        seller: item.seller,
      };
    });
    console.log(items);
  };

  useEffect(() => {
    // getAllNFTs();
  }, []);

  return <div className="bg-black text-white h-screen">home</div>;
};

export default Index;
