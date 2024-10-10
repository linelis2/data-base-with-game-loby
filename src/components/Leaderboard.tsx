import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  username: string;
  score: number;
}

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // TODO: Replace with API call to fetch leaderboard data
    const mockLeaderboard: LeaderboardEntry[] = [
      { rank: 1, username: 'CryptoChamp', score: 10000 },
      { rank: 2, username: 'TokenMaster', score: 9500 },
      { rank: 3, username: 'BlockchainWizard', score: 9000 },
      { rank: 4, username: 'NFTCollector', score: 8500 },
      { rank: 5, username: 'DeFiKing', score: 8000 },
    ];
    setLeaderboard(mockLeaderboard);
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Trophy className="mr-2 text-yellow-500" size={24} />
        Leaderboard
      </h2>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Rank</th>
            <th className="text-left py-2">Player</th>
            <th className="text-right py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry) => (
            <tr key={entry.rank} className="border-b last:border-b-0">
              <td className="py-2">{entry.rank}</td>
              <td className="py-2">{entry.username}</td>
              <td className="py-2 text-right">{entry.score.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;