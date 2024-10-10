import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  maxPlayers: { type: Number, required: true },
  status: { type: String, enum: ['waiting', 'inProgress', 'finished'], default: 'waiting' },
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;