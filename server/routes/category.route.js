import express from 'express';
import {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCatReg,
} from '../controllers/category.controller.js';

const categoryRouter = express.Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.post('/new', createCategory);
categoryRouter.get('/:catid', getOneCategory);
categoryRouter.put('/:catid', updateCategory);
categoryRouter.delete('/:catid', deleteCategory);
categoryRouter.get('/find/reg', getCatReg);

export default categoryRouter;
