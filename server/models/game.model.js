import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export const GameSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  score: {
    type: Number,
    required: true,
  },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Game', GameSchema);
