import React from "react";
import Image from "next/image";

const NFTItem = ({ item }) => {
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  console.log("item", item);
  return (
    <div className="m-10 p-10 flex flex-col justify-center items-center border  ">
      <Image
        loader={myLoader}
        src={item.image}
        alt="Picture of the author"
        width={250}
        height={250}
      />
      <div className="flex flex-col justify-center items-center">
        <p className="text-2xl font-bold">Name: {item.name}</p>
        <p className="text-xl">Description:{item.description}</p>
        <p className="text-xl">Price: {item.price} ETH</p>

        <button className="h-10 w-44 border border-[#03480f] p-1 rounded-lg  transition ease-in-out  hover:scale-110 hover:bg-[#d43680] hover:border-[#d43680]">
          Buy
        </button>
      </div>
    </div>
  );
};

export default NFTItem;
