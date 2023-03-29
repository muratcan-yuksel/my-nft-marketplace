import React from "react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

const NavBar = () => {
  return (
    <div>
      {" "}
      <nav className=" bg-black text-white flex justify-start items-center p-2 md:p-10 border border-[#03480f] ">
        <p className="  md:mr-10 md:ml-5 text-2xl border border-[#03480f] p-3 rounded-lg ">
          JoySea{" "}
        </p>
        <div className="flex flex-col md:flex-row items-center md:justify-between w-full ">
          <div className="flex flex-col md:flex-row justify-start items-center ">
            {" "}
            <Link href="/">
              <p className=" m-1    text-center md:mr-4 border border-[#03480f] p-1 rounded-lg transition ease-in-out  hover:scale-110 hover:bg-[#d43680]  hover:border-[#d43680] ">
                Home
              </p>
            </Link>
            <Link href="/createNFT">
              <p className=" m-1    text-center md:mr-4 border border-[#03480f] p-1 rounded-lg  transition ease-in-out  hover:scale-110 hover:bg-[#d43680] hover:border-[#d43680]">
                Create NFT
              </p>
            </Link>
            <Link href="/myNFTs">
              <p className=" m-1    text-center md:mr-4 border border-[#03480f] p-1 rounded-lg  transition ease-in-out  hover:scale-110 hover:bg-[#d43680] hover:border-[#d43680]">
                My NFTs
              </p>
            </Link>
          </div>
          <div className="">
            <ConnectWallet />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
