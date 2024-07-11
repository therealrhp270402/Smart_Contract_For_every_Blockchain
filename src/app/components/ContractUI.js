"use client";

import FunctionUI from "./FunctionUI.js";

export default function ContractUI({ abi, contract }) {
  return (
    <div className="flex flex-col items-center mt-8 mb-8">
      <div className="text-center mt-6 mb-4 text-3xl">&#11015;</div>
      <h3 className="mb-6 font-bold text-center text-2xl">Step 2: Interact with Smart Contract</h3>
      <div className="w-full max-w-lg space-y-6">
        {abi.map((fn, index) => (
          <FunctionUI key={index} fn={fn} contract={contract} />
        ))}
      </div>
    </div>
  );
}
