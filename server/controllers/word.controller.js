import Word from '../models/word.model.js';
import mongoose from 'mongoose';

export const getAllWords = (req, res) => {
  Word.find()
    .then((allWords) => {
      return res.status(200).json({
        success: true,
        message: 'All Words',
        Word: allWords,
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

export const getOneWord = (req, res) => {
  const id = req.params.wordid;
  Word.findById(id)
    .then((singleWord) => {
      res.status(200).json({
        success: true,
        message: 'singleWord',
        Word: singleWord,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'This user does not exist',
        error: err.message,
      });
    });
};

export const createWord = (req, res) => {
  const postWord = new Word({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    category_id: req.body.category_id,
    translation: req.body.translation,
  });
  return postWord
    .save()
    .then((newWord) => {
      return res.status(201).json({
        success: true,
        message: 'New word created successfully',
        Word: newWord,
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

export const updateWord = (req, res) => {
  const id = req.params.id;
  const updateObject = req.body;
  Word.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Word is updated',
        updateWord: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
      });
    });
};

export const deleteWord = (req, res) => {
  const id = req.params.id;
  // console.log('delete');
  Word.findByIdAndRemove(id)
    .exec()
    .then(() => {
      res.status(204).json({
        success: true,
        message: 'word deleted',
      });
      console.log('usunieto');
    })
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: 'Cannot find a word',
      })
    );
};

export const RandomWord = async (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.catid);
  Word.aggregate([{ $match: { category_id: id } }, { $sample: { size: 1 } }])
    .then((singleWord) => {
      console.log('clik');
      res.status(200).json({
        success: true,
        message: 'singleWord',
        Word: singleWord,
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

export const wordByCategory = async (req, res) => {
  Word.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category_id',
        foreignField: '_id',
        as: 'ref',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        translation: 1,
        category: '$ref.name',
      },
    },
  ])
    .then((words) => {
      res.status(200).json({
        success: true,
        message: 'words',
        Words: words,
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

export const getWordReg = async (req, res) => {
  const { name = '' } = req.query;
  console.log(req.params);
  Word.aggregate([
    { $match: { name: { $regex: name, $options: 'i' } } },
    {
      $lookup: {
        from: 'categories',
        localField: 'category_id',
        foreignField: '_id',
        as: 'ref',
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        translation: 1,
        category: '$ref.name',
      },
    },
  ])
    .then((allWords) => {
      return res.status(200).json({
        success: true,
        message: 'all Words with regex',
        Word: allWords,
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
