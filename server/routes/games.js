import express from 'express';
import Game from '../models/Game.js';
import { io } from '../index.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const games = await Game.find({ status: 'waiting' }).populate('creator', 'username');
    res.json(games);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, maxPlayers, creator } = req.body;
    const game = new Game({ name, maxPlayers, creator, players: [creator] });
    await game.save();
    const populatedGame = await Game.findById(game._id).populate('creator', 'username');
    io.to('lobby').emit('gameCreated', populatedGame);
    res.status(201).json(populatedGame);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/:id/join', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const game = await Game.findById(id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }
    if (game.players.length >= game.maxPlayers) {
      return res.status(400).json({ error: 'Game is full' });
    }
    if (!game.players.includes(userId)) {
      game.players.push(userId);
      await game.save();
      io.to(`game:${id}`).emit('playerJoined', { gameId: id, userId });
    }
    res.json(game);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;