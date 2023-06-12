import User from '../models/user.model.js';
import mongoose from 'mongoose';

export const getAllUsers = (req, res) => {
  User.find()
    .then((allUsers) => {
      return res.status(200).json({
        success: true,
        message: 'All Users',
        User: allUsers,
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

export const getOneUser = (req, res) => {
  const id = req.params.userid;
  User.findById(id)
    .then((singleUser) => {
      res.status(200).json({
        success: true,
        message: 'Single User',
        User: singleUser,
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

export const createUser = (req, res) => {
  const postUser = new User({
    _id: mongoose.Types.ObjectId(),
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    created_at: req.body.created_at,
  });
  return postUser
    .save()
    .then((newUser) => {
      return res.status(201).json({
        success: true,
        message: 'New user created successfully',
        User: newUser,
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

export const updateUser = (req, res) => {
  const id = req.params.userid;
  const updateObject = req.body;
  User.update({ _id: id }, { $set: updateObject })
    .exec()
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'User is updated',
        updateUser: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: 'Server error. Please try again.',
      });
    });
};

export const deleteUser = (req, res) => {
  const id = req.params.postid;
  User.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
        message: 'Cannot find a user.',
      })
    );
};

// export const topUser = (req, res) => {
//   User.aggregate([]).then((singleWord) => {
//     res.status(200).json({
//       success: true,
//       message: 'singleWord',
//       Word: singleWord,
//     });
//   });
// };
