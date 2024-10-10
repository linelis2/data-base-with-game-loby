import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { ArrowRightLeft, DollarSign, Coins, Zap } from 'lucide-react';

interface ExchangeRate {
  eth: number;
  gameTokens: number;
}

const exchangeRates: ExchangeRate[] = [
  { eth: 0.01, gameTokens: 10000 },
  { eth: 0.1, gameTokens: 120000 },
  { eth: 1, gameTokens: 1500000 },
];

const TokenExchange: React.FC = () => {
  const { account } = useWeb3();
  const [amount, setAmount] = useState('');
  const [exchangeType, setExchangeType] = useState<'erc20ToGame' | 'gameToErc20'>('erc20ToGame');

  const handleExchange = () => {
    // TODO: Implement token exchange logic using smart contract
    console.log(`Exchanging ${amount} tokens (${exchangeType})`);
    // Reset form after exchange
    setAmount('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Token Exchange</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-center space-x-4 mb-6">
            <button
              className={`flex items-center px-4 py-2 rounded-lg ${
                exchangeType === 'erc20ToGame'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setExchangeType('erc20ToGame')}
            >
              <DollarSign className="mr-2" size={18} />
              ETH to Game Tokens
            </button>
            <button
              className={`flex items-center px-4 py-2 rounded-lg ${
                exchangeType === 'gameToErc20'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => setExchangeType('gameToErc20')}
            >
              <Coins className="mr-2" size={18} />
              Game Tokens to ETH
            </button>
          </div>
          <div className="mb-6">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount to Exchange
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter amount"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="text-lg font-semibold">
              {exchangeType === 'erc20ToGame' ? 'ETH' : 'Game Tokens'}
            </div>
            <ArrowRightLeft className="text-gray-500" size={24} />
            <div className="text-lg font-semibold">
              {exchangeType === 'erc20ToGame' ? 'Game Tokens' : 'ETH'}
            </div>
          </div>
          <button
            onClick={handleExchange}
            disabled={!amount || parseFloat(amount) <= 0}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Exchange Tokens
          </button>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-blue-500 shadow-md rounded-lg p-6 text-white">
          <h3 className="text-2xl font-bold mb-4">Exchange Rates</h3>
          <p className="mb-4">Get more value with larger exchanges!</p>
          {exchangeRates.map((rate, index) => (
            <div key={index} className="flex items-center justify-between mb-4 bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center">
                <DollarSign className="mr-2" size={24} />
                <span className="text-xl font-semibold">{rate.eth} ETH</span>
              </div>
              <ArrowRightLeft className="mx-4" size={24} />
              <div className="flex items-center">
                <Coins className="mr-2" size={24} />
                <span className="text-xl font-semibold">{rate.gameTokens.toLocaleString()} Tokens</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {exchangeRates.map((rate, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 border-2 border-blue-500 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-blue-600">Tier {index + 1}</h3>
              <Zap className="text-yellow-500" size={24} />
            </div>
            <p className="text-3xl font-bold mb-2">{rate.eth} ETH</p>
            <p className="text-lg text-gray-600 mb-4">for</p>
            <p className="text-4xl font-bold text-green-500 mb-4">{rate.gameTokens.toLocaleString()} Tokens</p>
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenExchange;