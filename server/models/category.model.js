import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const CategorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  translation: { type: String, required: true },
});

export default mongoose.model('Category', CategorySchema);
