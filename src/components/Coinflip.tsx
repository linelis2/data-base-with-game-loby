import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { Coins, RotateCw, X } from 'lucide-react';

interface CoinflipProps {
  onClose: () => void;
}

const Coinflip: React.FC<CoinflipProps> = ({ onClose }) => {
  const { user, updateUserProfile } = useWeb3();
  const [betAmount, setBetAmount] = useState('');
  const [selectedSide, setSelectedSide] = useState<'heads' | 'tails' | null>(null);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const handleFlip = async () => {
    if (!selectedSide || !betAmount || isFlipping || !user) return;

    const bet = parseInt(betAmount);
    if (bet > user.gameTokens) {
      alert("You don't have enough tokens for this bet!");
      return;
    }

    setIsFlipping(true);
    setResult(null);

    // Simulate coin flip
    setTimeout(async () => {
      const flipResult = Math.random() < 0.5 ? 'heads' : 'tails';
      setResult(flipResult);
      setIsFlipping(false);

      const newBalance = flipResult === selectedSide
        ? user.gameTokens + bet
        : user.gameTokens - bet;

      try {
        await updateUserProfile({ gameTokens: newBalance });
        if (flipResult === selectedSide) {
          alert(`You won ${bet} tokens!`);
        } else {
          alert(`You lost ${bet} tokens.`);
        }
      } catch (error) {
        console.error('Failed to update game tokens:', error);
      }

      setBetAmount('');
      setSelectedSide(null);
    }, 2000);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <X size={24} />
      </button>
      <h2 className="text-3xl font-bold mb-6">Coinflip Game</h2>
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-semibold">Your Balance:</div>
          <div className="text-2xl font-bold text-green-600">{user.gameTokens} Tokens</div>
        </div>
        <div className="mb-6">
          <label htmlFor="betAmount" className="block text-sm font-medium text-gray-700 mb-2">
            Bet Amount
          </label>
          <input
            type="number"
            id="betAmount"
            value={betAmount}
            onChange={(e) => setBetAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter bet amount"
          />
        </div>
        <div className="mb-6">
          <div className="text-sm font-medium text-gray-700 mb-2">Choose Side</div>
          <div className="flex space-x-4">
            <button
              onClick={() => setSelectedSide('heads')}
              className={`flex-1 py-2 px-4 rounded-md ${
                selectedSide === 'heads' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Heads
            </button>
            <button
              onClick={() => setSelectedSide('tails')}
              className={`flex-1 py-2 px-4 rounded-md ${
                selectedSide === 'tails' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              Tails
            </button>
          </div>
        </div>
        <button
          onClick={handleFlip}
          disabled={!selectedSide || !betAmount || isFlipping}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isFlipping ? (
            <>
              <RotateCw className="animate-spin mr-2" size={24} />
              Flipping...
            </>
          ) : (
            <>
              <Coins className="mr-2" size={24} />
              Flip Coin
            </>
          )}
        </button>
        {result && (
          <div className="mt-6 text-center">
            <div className="text-2xl font-bold mb-2">Result: {result.toUpperCase()}</div>
            <div className="text-xl">
              {result === selectedSide ? (
                <span className="text-green-600">You won {betAmount} tokens!</span>
              ) : (
                <span className="text-red-600">You lost {betAmount} tokens.</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coinflip;