import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, Coins } from 'lucide-react';
import Coinflip from '../components/Coinflip';
import CreateGameModal from '../components/CreateGameModal';
import { useWeb3 } from '../contexts/Web3Context';
import axios from 'axios';
import io from 'socket.io-client';

interface Game {
  _id: string;
  name: string;
  players: string[];
  maxPlayers: number;
  creator: {
    _id: string;
    username: string;
  };
}

const Lobby: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [showCoinflip, setShowCoinflip] = useState(false);
  const [showCreateGame, setShowCreateGame] = useState(false);
  const { user, token } = useWeb3();

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.emit('joinLobby');

    const fetchGames = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/games', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();

    socket.on('gameCreated', (newGame: Game) => {
      setGames((prevGames) => [...prevGames, newGame]);
    });

    socket.on('playerJoined', ({ gameId, userId }) => {
      setGames((prevGames) =>
        prevGames.map((game) =>
          game._id === gameId
            ? { ...game, players: [...game.players, userId] }
            : game
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [token]);

  const handleCreateGame = async (newGame: { name: string; maxPlayers: number }) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/games',
        { ...newGame, creator: user?.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGames([...games, response.data]);
      setShowCreateGame(false);
    } catch (error) {
      console.error('Error creating game:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="col-span-1 md:col-span-2">
        <h2 className="text-3xl font-bold mb-6">Game Lobby</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {games.map((game) => (
            <div key={game._id} className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
              <p className="text-gray-600 mb-2">
                <Users className="inline mr-2" size={18} />
                {game.players.length} / {game.maxPlayers} players
              </p>
              <p className="text-gray-600 mb-4">Created by: {game.creator.username}</p>
              <Link
                to={`/game/${game._id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
              >
                Join Game
              </Link>
            </div>
          ))}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Coinflip</h3>
            <p className="text-gray-600 mb-4">
              <Coins className="inline mr-2" size={18} />
              Quick game, double your tokens!
            </p>
            <button
              onClick={() => setShowCoinflip(true)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-block"
            >
              Play Coinflip
            </button>
          </div>
          <div className="bg-gray-100 shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
            <Plus className="text-gray-400 mb-2" size={48} />
            <button 
              onClick={() => setShowCreateGame(true)}
              className="text-blue-500 hover:text-blue-600 font-semibold"
            >
              Create New Game
            </button>
          </div>
        </div>
      </div>
      {showCoinflip && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <Coinflip onClose={() => setShowCoinflip(false)} />
          </div>
        </div>
      )}
      {showCreateGame && (
        <CreateGameModal onClose={() => setShowCreateGame(false)} onCreateGame={handleCreateGame} />
      )}
    </div>
  );
};

export default Lobby;