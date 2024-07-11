"use client"
import { useState } from "react";
import { ethers } from "ethers";

export default function Connect({ setSigner }) {
  const [error, setError] = useState(undefined);

  const connect = async () => {
    if (!window.ethereum) {
      setError("You need to install Metamask before using this app");
      return;
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    try {
      const signer = await provider.getSigner();
      setSigner(signer);
    } catch {
      setError("You need to accept the connection request of Metamask to use this app");
    }
  };

  return (
    <div className="text-center">
      <button 
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mt-4 transition-colors duration-300"
        onClick={connect}
      >
        Connect
      </button>
      {error && (
        <div className="mt-3 text-red-500">
          <i className="bi bi-exclamation-triangle"></i> {error}
        </div>
      )}
    </div>
  );
}
