"use client";

import { useState } from "react";

export default function FunctionUI({ fn, contract }) {
  const initialInputVals = fn.inputs.reduce(
    (acc, input) => ({ ...acc, [input.name]: "" }),
    {}
  );
  const [inputVals, setInputVals] = useState(initialInputVals);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(undefined);
  const [txConfirmation, setTxConfirmation] = useState(undefined);
  const [error, setError] = useState(undefined);

  const updateInputVal = (inputName, newValue) => {
    setResponse(undefined);
    setTxConfirmation(undefined);
    setInputVals({ ...inputVals, [inputName]: newValue.target.value });
  };

  const isDisabled = () => {
    return fn.inputs.some((input) => inputVals[input.name] === "");
  };

  const executeFn = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (fn.stateMutability === "view") {
        const response = await contract[fn.name](...Object.values(inputVals));
        setResponse(response.toString());
        return;
      }
      const tx = await contract[fn.name](...Object.values(inputVals));
      const txReceipt = await tx.wait();
      setTxConfirmation(`Your transaction was mined: ${txReceipt.hash}`);
    } catch {
      setError("There was an error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 input-container flex flex-col items-center">
      <h3 className="mb-3 text-2xl font-bold text-center">{fn.name}</h3>
      <form className="input w-full max-w-md" onSubmit={executeFn}>
        {fn.inputs.map((input) => (
          <div key={input.name} className="mb-3">
            <label
              htmlFor={input.name}
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {input.name}
            </label>
            <input
              name={input.name}
              type="text"
              className="form-input w-full mt-1 p-2 border rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
              value={inputVals[input.name]}
              placeholder={input.type}
              onChange={(newValue) => updateInputVal(input.name, newValue)}
            />
          </div>
        ))}
        <button
          type="submit"
          className="btn btn-primary w-full py-2 px-4 rounded-lg mt-2"
          disabled={isDisabled()}
        >
          Submit
        </button>
      </form>
      {loading && (
        <div className="alert alert-info mt-3 mb-0">
          <i className="bi bi-hourglass-bottom"></i> Loading...
        </div>
      )}
      {response && (
        <div className="alert alert-info mt-3 mb-0">
          <i className="bi bi-info-circle-fill"></i> {response}
        </div>
      )}
      {txConfirmation && (
        <div className="alert alert-info mt-3 mb-0">
          <i className="bi bi-info-circle-fill"></i> {txConfirmation}
        </div>
      )}
      {error && (
        <div className="alert alert-danger mt-3 mb-0">
          <i className="bi bi-exclamation-triangle"></i> {error}
        </div>
      )}
    </div>
  );
}
