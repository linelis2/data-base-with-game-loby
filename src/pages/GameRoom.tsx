import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Users, MessageSquare, Send } from 'lucide-react';

interface Player {
  address: string;
  username: string;
  ready: boolean;
}

interface Message {
  sender: string;
  content: string;
  timestamp: number;
}

const GameRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    // TODO: Fetch game data and connect to WebSocket for real-time updates
    const mockPlayers: Player[] = [
      { address: '0x1234...5678', username: 'CryptoGamer', ready: true },
      { address: '0xabcd...efgh', username: 'BlockchainMaster', ready: false },
      { address: '0x9876...5432', username: 'TokenTrader', ready: true },
    ];
    setPlayers(mockPlayers);

    const mockMessages: Message[] = [
      { sender: 'CryptoGamer', content: 'Hey everyone!', timestamp: Date.now() - 300000 },
      { sender: 'BlockchainMaster', content: 'Ready to play?', timestamp: Date.now() - 120000 },
    ];
    setMessages(mockMessages);
  }, [id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      const newMessage: Message = {
        sender: 'You',
        content: inputMessage,
        timestamp: Date.now(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
      // TODO: Send message to WebSocket
    }
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <h2 className="text-3xl font-bold mb-6">Game Room #{id}</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Players</h3>
          <ul className="space-y-2">
            {players.map((player) => (
              <li key={player.address} className="flex items-center justify-between">
                <span>{player.username} ({player.address.slice(0, 6)}...{player.address.slice(-4)})</span>
                <span className={`px-2 py-1 rounded ${player.ready ? 'bg-green-500 text-white' : 'bg-yellow-500 text-black'}`}>
                  {player.ready ? 'Ready' : 'Not Ready'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-1">
        <div className="bg-white shadow-md rounded-lg p-6 h-full flex flex-col">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <MessageSquare className="mr-2" size={24} />
            Chat
          </h3>
          <div className="flex-grow overflow-y-auto mb-4">
            {messages.map((message, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold">{message.sender}: </span>
                <span>{message.content}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-grow border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GameRoom;