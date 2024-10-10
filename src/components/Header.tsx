import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Context';
import { Gamepad2, LogOut } from 'lucide-react';

const Header: React.FC = () => {
  const { account, connectWallet, disconnectWallet, isConnected, error, user, logout } = useWeb3();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Gamepad2 size={32} />
          <span className="text-xl font-bold">GameLobby</span>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/lobby" className="hover:text-blue-200">Lobby</Link></li>
            <li><Link to="/profile" className="hover:text-blue-200">Profile</Link></li>
            <li><Link to="/exchange" className="hover:text-blue-200">Exchange</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          {user && (
            <span className="text-sm">
              {user.username} - {user.gameTokens} Tokens
            </span>
          )}
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm">{account?.slice(0, 6)}...{account?.slice(-4)}</span>
              <button
                onClick={disconnectWallet}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              >
                Disconnect
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Connect Wallet
            </button>
          )}
          {user && (
            <button
              onClick={logout}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded flex items-center"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </button>
          )}
        </div>
      </div>
      {error && (
        <div className="bg-red-500 text-white text-center py-2 px-4">
          {error}
        </div>
      )}
    </header>
  );
};

export default Header;