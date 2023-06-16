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
import { keycloak } from '../middleware/keycloak.services.js';

const wordRouter = express.Router();

wordRouter.get(
  '/',
  keycloak.protect((token) => {
    keycloak.protect((token) => {
      return !token.hasRole('admin');
    });
  }),
  getAllWords
);
wordRouter.post(
  '/new',
  keycloak.protect((token) => {
    keycloak.protect((token) => {
      return !token.hasRole('admin');
    });
  }),
  createWord
);
wordRouter.get('/table', wordByCategory);
wordRouter.get(
  '/:id',
  keycloak.protect((token) => {
    keycloak.protect((token) => {
      return !token.hasRole('admin');
    });
  }),
  getOneWord
);
wordRouter.put('/:id', updateWord);
wordRouter.delete('/:id', deleteWord);
wordRouter.get('/random/:catid', RandomWord);
wordRouter.get('/find/reg', getWordReg);

export default wordRouter;
