import React, { useState, useEffect, useContext } from "react";
import { ethers, utils } from "ethers";
import { address, abi } from "../Marketplace.json";
import { DataContext } from "../components/dataProvider";
import axios from "axios";

function MyComponent() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [result, setResult] = useState(null);
  const [data, setData] = useContext(DataContext);

  const clicky = () => {
    console.log(data);
  };

  const handleClick = async () => {
    try {
      // Call the contract function
      const result = await data.contract.getAllNFTs();
      setResult(result);
      console.log("result", result);
      //console log in human readable format
      const items = await Promise.all(
        result.map(async (i) => {
          const tokenURI = await contract.tokenURI(i.tokenId);
          let meta = await axios.get(tokenURI);
          meta = meta.data;

          let price = ethers.utils.formatUnits(i.price.toString(), "ether");
          let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
          };
          return item;
        })
      );
      console.log("items", items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      setProvider(data.provider);
      setContract(data.contract);
      handleClick();
    }
    console.log("data", data);
  }, [data]);

  return (
    <div>
      <button onClick={handleClick}>click</button>
    </div>
  );
}

export default MyComponent;
