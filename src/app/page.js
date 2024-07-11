"use client"
import { useState } from "react";
import Connect from "./components/Connect";
import UploadContract from "./components/UploadContract";
import ContractUI from "./components/ContractUI";

export default function Home() {
  const [signer, setSigner] = useState(undefined);
  const [abi, setAbi] = useState(undefined);
  const [contract, setContract] = useState(undefined);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-8 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-black">
      <div id="content" className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
        <div id="content-inner" className="text-center mb-8">
          <h1 id="title" className="text-3xl font-bold text-gray-900 dark:text-gray-100">RHP UNIVERSAL BLOCKCHAIN APP</h1>
          <p id="sub-title" className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
            A frontend interface for ANY Smart Contracts
          </p>
        </div>
        {signer ? (
          <>
            <UploadContract signer={signer} setAbi={setAbi} setContract={setContract} />
            {abi && Array.isArray(abi) ? <ContractUI abi={abi} contract={contract} /> : null}
          </>
        ) : (
          <Connect setSigner={setSigner} />
        )}
      </div>
    </main>
  );
}
