import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, required: true, default: 'normal' },
    score: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model('User', UserSchema);
