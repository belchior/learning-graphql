import mongoose, { Schema } from 'mongoose';


export const RepositoryOwnerSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  ref: { type: String, required: true, trim: true,  },
});
