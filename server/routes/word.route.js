import express from 'express';
import {
  createWord,
  deleteWord,
  getAllWords,
  getOneWord,
  getWordReg,
  RandomWord,
  updateWord,
  wordByCategory,
} from '../controllers/word.controller.js';

const wordRouter = express.Router();

wordRouter.get('/', getAllWords);
wordRouter.post('/new', createWord);
wordRouter.get('/table', wordByCategory);
wordRouter.get('/:id', getOneWord);
wordRouter.put('/:id', updateWord);
wordRouter.delete('/:id', deleteWord);
wordRouter.get('/random/:catid', RandomWord);
wordRouter.get('/find/reg', getWordReg);

export default wordRouter;
