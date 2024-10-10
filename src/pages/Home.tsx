import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Context';
import { Gamepad2, Coins, Users } from 'lucide-react';

const Home: React.FC = () => {
  const { isConnected } = useWeb3();

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-6">Welcome to GameLobby</h1>
      <p className="text-xl mb-8">Connect your wallet and start playing crypto games!</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Gamepad2 size={48} className="mx-auto mb-4 text-blue-500" />
          <h3 className="text-xl font-semibold mb-2">Play Games</h3>
          <p>Enjoy a variety of crypto-powered games</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Coins size={48} className="mx-auto mb-4 text-green-500" />
          <h3 className="text-xl font-semibold mb-2">Earn Tokens</h3>
          <p>Win and trade game tokens for real crypto</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users size={48} className="mx-auto mb-4 text-purple-500" />
          <h3 className="text-xl font-semibold mb-2">Join Community</h3>
          <p>Connect with players from around the world</p>
        </div>
      </div>
      
      {isConnected ? (
        <Link
          to="/lobby"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Enter Lobby
        </Link>
      ) : (
        <div>
          <p className="text-red-500 mb-4">Please connect your wallet to access the game lobby.</p>
          <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg text-lg mr-4 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;