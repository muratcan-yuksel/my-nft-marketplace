import React from "react";

const NFTItem = ({ item }) => {
  console.log("item", item);
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <img src={item.image} alt="" className="w-60 h-60" />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">{item.name}</h1>
          <p className="text-lg">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NFTItem;
