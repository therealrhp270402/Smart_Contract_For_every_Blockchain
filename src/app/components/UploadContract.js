"use client";

import { Contract } from "ethers";
import { useState } from "react";

export default function UploadContract({ signer, setAbi, setContract }) {
  const [abiString, setAbiString] = useState("");
  const [address, setAddress] = useState("");
  const [contractUploaded, setContractUploaded] = useState(false);
  const [error, setError] = useState(undefined);

  const updateAbiString = (data) => {
    setError(undefined);
    setAbiString(data.target.value.trim());
  };

  const buildUI = (e) => {
    e.preventDefault();
    try {
      let abiObj = JSON.parse(abiString);
      const contract = new Contract(address, abiObj, signer);
      abiObj = abiObj.filter((element) => element.type === "function");
      setAbi(abiObj);
      setContract(contract);
      setContractUploaded(true);
    } catch (e) {
      setError("Not a valid JSON");
    }
  };

  return (
    <>
      <h3 className="text-xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
        Step 1: Update contract details
      </h3>
      <form onSubmit={buildUI}>
        <div className="mb-4">
          <label htmlFor="abi" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Abi
          </label>
          <textarea
            name="abi"
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            rows="10"
            placeholder="Copy paste the Abi of the smart contract"
            disabled={contractUploaded}
            onChange={updateAbiString}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Address
          </label>
          <input
            name="address"
            type="text"
            className="w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
            value={address}
            placeholder="0x..."
            disabled={contractUploaded}
            onChange={(newValue) => setAddress(newValue.target.value)}
          />
        </div>
        {!contractUploaded && (
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              disabled={!abiString || !address}
            >
              Submit
            </button>
          </div>
        )}
        {error && (
          <div className="mt-3 mb-0 text-red-500">
            <i className="bi bi-exclamation-triangle"></i> {error}
          </div>
        )}
      </form>
    </>
  );
}
