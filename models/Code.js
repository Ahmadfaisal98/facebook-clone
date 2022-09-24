import mongoose from 'mongoose';

const { ObjectId } = mongoose.Schema;

const codeSchema = new mongoose.Schema({
  code: {
    type: Number,
    required: true,
  },
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
});

export default mongoose.model('Code', codeSchema);
