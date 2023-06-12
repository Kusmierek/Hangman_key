import Category from '../models/category.model.js';
import mongoose from 'mongoose';

export const getAllCategories = (req, res) => {
  Category.find()
    .then((allCategories) => {
      return res.status(200).json({
        success: true,
        message: 'All Categories',
        Category: allCategories,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error',
        error: err.message,
      });
    });
};

export const getOneCategory = (req, res) => {
  const id = req.params.catid;
  Category.findById(id)
    .then((singleCategory) => {
      res.status(200).json({
        success: true,
        message: 'singleCategory',
        Category: singleCategory,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This category does not exist',
        error: err.message,
      });
    });
};

export const createCategory = (req, res) => {
  const postCategory = new Category({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    translation: req.body.translation,
  });
  console.log(postCategory);
  return postCategory
    .save()
    .then((newCategory) => {
      return res.status(201).json({
        success: true,
        message: 'New Category created successfully',
        Category: postCategory,
      });
    })
    .catch((error) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
        error: error.message,
      });
    });
};

export const updateCategory = (req, res) => {
  const id = req.params.catid;
  const updateObject = req.body;
  Category.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Category is updated',
        updateCategory: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
      });
    });
};

export const deleteCategory = (req, res) => {
  const id = req.params.catid;
  Category.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: 'Cannot find a category',
      })
    );
};

export const getCatReg = async (req, res) => {
  const { name = '' } = req.query;
  console.log(req.params);
  Category.aggregate([
    { $match: { name: { $regex: name, $options: 'i' } } },
    {
      $project: {
        _id: 1,
        name: 1,
        translation: 1,
      },
    },
  ])
    .then((getAllCategories) => {
      return res.status(200).json({
        success: true,
        message: 'all categories with regex',
        getCatReg: getAllCategories,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server Alle',
        error: err.message,
      });
    });
};
