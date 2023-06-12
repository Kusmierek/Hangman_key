import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const WordSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  translation: { type: String, required: true },
});

export default mongoose.model('Word', WordSchema);
