import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import { DataContext } from "@/components/dataProvider";
import { utils } from "ethers";

const NFTItem = ({ item }) => {
  const [data, setData] = useContext(DataContext);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  const executeSale = (e) => {
    console.log(e);
    try {
      const result = contract.executeSale(e.tokenId, {
        value: utils.parseEther(e.price.toString()),
      });
      console.log("result", result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data) {
      setProvider(data.provider);
      setContract(data.contract);
    }
    console.log("data", data);
    // setCount(count + 1);
  }, [data]);

  console.log("item", item);
  return (
    <div className=" m-10 p-10 flex flex-col justify-center items-center border  ">
      <Image
        loader={myLoader}
        src={item.image}
        alt="Picture of the author"
        width={250}
        height={250}
      />
      <div className="flex flex-col justify-center items-center">
        <p className="text-md font-bold">Token ID: {item.tokenId}</p>
        <p className="text-md font-bold">Owner: {item.owner}</p>
        <p className="text-md font-bold">Seller: {item.seller}</p>
        <p className="text-md font-bold">Name: {item.name}</p>
        <p className="text-xl">Description:{item.description}</p>
        <p className="text-xl">Price: {item.price} ETH</p>

        <button
          onClick={() => executeSale(item)}
          className="h-10 w-44 border border-[#03480f] p-1 rounded-lg  transition ease-in-out  hover:scale-110 hover:bg-[#d43680] hover:border-[#d43680]"
        >
          Buy
        </button>
      </div>
    </div>
  );
};

export default NFTItem;
