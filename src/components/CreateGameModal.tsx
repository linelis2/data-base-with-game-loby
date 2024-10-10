import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateGameModalProps {
  onClose: () => void;
  onCreateGame: (game: { name: string; maxPlayers: number }) => void;
}

const CreateGameModal: React.FC<CreateGameModalProps> = ({ onClose, onCreateGame }) => {
  const [name, setName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateGame({ name, maxPlayers });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Create New Game</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="gameName" className="block text-sm font-medium text-gray-700 mb-2">
              Game Name
            </label>
            <input
              type="text"
              id="gameName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="maxPlayers" className="block text-sm font-medium text-gray-700 mb-2">
              Max Players
            </label>
            <input
              type="number"
              id="maxPlayers"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(parseInt(e.target.value))}
              min="2"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Create Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGameModal;