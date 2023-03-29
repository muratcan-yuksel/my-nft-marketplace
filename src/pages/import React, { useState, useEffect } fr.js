import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { address, abi } from "../Marketplace.json";

function MyComponent() {
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Check if MetaMask is installed
    if (window.ethereum) {
      // Set up ethers provider using MetaMask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Set up contract instance using the address and ABI
      const contract = new ethers.Contract(address, abi, provider.getSigner());
      setContract(contract);
      //console log address
      console.log(contract.address);
    } else {
      console.log("Please install MetaMask!");
    }
  }, []);

  const handleClick = async () => {
    try {
      // Call the contract function
      // const result = await contract.functionName(args);
      // setResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {provider ? (
        <button onClick={handleClick}>Call Contract Function</button>
      ) : (
        <p>Please install MetaMask to use this feature.</p>
      )}
      {result && <p>Result: {result.toString()}</p>}
    </div>
  );
}

export default MyComponent;
