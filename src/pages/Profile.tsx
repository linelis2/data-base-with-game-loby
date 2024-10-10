import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { User, Edit2 } from 'lucide-react';

const Profile: React.FC = () => {
  const { account, user, updateUserProfile } = useWeb3();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUsername, setEditedUsername] = useState('');

  useEffect(() => {
    if (user) {
      setEditedUsername(user.username);
    }
  }, [user]);

  const handleSaveProfile = async () => {
    if (user) {
      try {
        await updateUserProfile({ username: editedUsername });
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update profile:', error);
      }
    }
  };

  if (!user) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-6">
          <img
            src={`https://source.unsplash.com/random/100x100?face=${user.id}`}
            alt="User Avatar"
            className="w-24 h-24 rounded-full mr-6"
          />
          <div>
            {isEditing ? (
              <input
                type="text"
                value={editedUsername}
                onChange={(e) => setEditedUsername(e.target.value)}
                className="text-2xl font-semibold mb-2 border rounded px-2 py-1"
              />
            ) : (
              <h3 className="text-2xl font-semibold mb-2">{user.username}</h3>
            )}
            <p className="text-gray-600">{account || 'Wallet not connected'}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-100 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2">Game Tokens</h4>
            <p className="text-3xl font-bold text-blue-600">{user.gameTokens}</p>
          </div>
          <div className="bg-green-100 rounded-lg p-4">
            <h4 className="text-lg font-semibold mb-2">ERC-20 Tokens</h4>
            <p className="text-3xl font-bold text-green-600">{user.erc20Tokens}</p>
          </div>
        </div>
        {isEditing ? (
          <button
            onClick={handleSaveProfile}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          >
            Save Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <Edit2 className="mr-2" size={18} />
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;