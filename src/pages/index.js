import React, { useState, useEffect, useContext } from "react";
import { ethers, utils } from "ethers";
import { address, abi } from "../Marketplace.json";
import { DataContext } from "../components/dataProvider";

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
      console.log(
        "result",
        result.map((item) => {
          return {
            owner: item.owner,
            price: utils.formatEther(item.price),
            seller: item.seller,
            currentlyListed: item.currentlyListed,
            //parse big number but not ether, it's id
            tokenId: item.tokenId.toNumber(),
          };
        })
      );
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
