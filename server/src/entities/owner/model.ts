import { Schema } from 'mongoose';


export const RepositoryOwnerSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  ref: { type: String, required: true, trim: true,  },
});
