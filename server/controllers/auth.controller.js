import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const jwtToken = toString(process.env.JWT_TOKEN);

export const Login = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (user == null) {
    res.status(400).json({
      success: false,
      message: 'Email or password incorrect!',
    });
  } else {
    const validate = await bcrypt.compare(req.body.password, user.password);
    if (validate) {
      const token = createJWT(user);
      res.status(200).json({
        success: true,
        message: 'User logged in!',
        User: {
          user: user,
          token: token,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Email or password incorrect!',
      });
    }
  }
};

export const Register = async (req, res) => {
  const hashedPwd = await bcrypt.hash(req.body.password, 10);
  console.log(req.body);
  User.find({ email: req.body.email }, (err, users) => {
    if (users.length) {
      res.status(409).json({
        success: false,
        message: 'This user already exists!',
      });
    } else {
      const user = new User({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        password: hashedPwd,
        email: req.body.email,
        created_at: req.body.created_at,
      });
      return user
        .save()
        .then((newUser) => {
          const token = createJWT(newUser);
          return res.status(201).json({
            success: true,
            message: 'New user created!',
            User: {
              user: newUser,
              token: token,
            },
          });
        })
        .catch((error) => {
          res.status(500).json({
            success: false,
            message: 'Error. Please try again!',
            error: error.message,
          });
        });
    }
  });
};

export const Logout = async (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: 'Successfully logged out' });
};

const createJWT = (user) => {
  const maxAge = 3 * 60 * 60;
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    jwtToken,
    {
      expiresIn: maxAge,
    }
  );
  return token;
};
