import express from 'express';
import { createGame, topGamers } from '../controllers/game.controller.js';
import { loggedIn } from '../middleware/middleware.js';

const gameRouter = express.Router();

gameRouter.post('/new', loggedIn, createGame);
gameRouter.get('/top', topGamers);

export default gameRouter;
