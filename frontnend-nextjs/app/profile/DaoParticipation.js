import React, { useState, useEffect } from 'react';
import useToken from '../hooks/useToken';

const DaoParticipation = () => {
  const [purchaseAmount, setPurchaseAmount] = useState(10);
  const [increaseAmount, setIncreaseAmount] = useState(0);
  const [decreaseAmount, setDecreaseAmount] = useState(0);
  const { ethereumBalance, stakedBalance, tokenPriceInEther } = useToken();
  const [rdaoBalance, setRdaoBalance] = useState(0);
  const [amountStaked, setAmountStaked] = useState(0);

  useEffect(() => {
    // You can load additional data here if needed
  }, [ethereumBalance, stakedBalance, tokenPriceInEther]);

  const handlePurchase = () => {
    // Call the token contract to purchase RDAO tokens
    onPurchase(purchaseAmount);
  };

  const handleIncreaseStake = () => {
    // Call the token contract to increase stake
    onIncreaseStake(increaseAmount);
  };

  const handleDecreaseStake = () => {
    // Call the token contract to decrease stake
    onDecreaseStake(decreaseAmount);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-lg center-items">
      <div className="bg-blue-100 p-4 mb-4">
        <p>
          To participate in the DAO and earn tokens, you need to stake 10 RDAO tokens. You can directly purchase and stake them below. The purchase price is {tokenPriceInEther} Ether.
        </p>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">
          Your Balances
        </p>
        <p>Your balance is {ethereumBalance} Ether and {stakedBalance} RDAO.</p>
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Your Purchase Amount:</label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={purchaseAmount}
            onChange={(e) => setPurchaseAmount(e.target.value)}
            className="w-1/2 px-3 py-2 border rounded-md"
          />
          <button onClick={handlePurchase} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Purchase
          </button>
        </div>
      </div>
      <div className="mb-4">
        <p className="text-lg font-semibold">Your Staked Amount</p>
        <p>Your staked amount is {stakedBalance} RDAO.</p>
        <div className="flex space-x-2">
          <div>
            <label className="block mb-2 font-semibold">Increase Stake:</label>
            <input
              type="number"
              value={increaseAmount}
              onChange={(e) => setIncreaseAmount(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-md"
            />
            <button onClick={handleIncreaseStake} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
              Increase
            </button>
          </div>
          <div>
            <label className="block mb-2 font-semibold">Decrease Stake:</label>
            <input
              type="number"
              value={decreaseAmount}
              onChange={(e) => setDecreaseAmount(e.target.value)}
              className="w-1/2 px-3 py-2 border rounded-md"
            />
            <button onClick={handleDecreaseStake} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
              Decrease
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DaoParticipation;
