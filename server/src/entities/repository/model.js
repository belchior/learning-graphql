import mongoose, { model, Schema } from 'mongoose';


const LiceseSchema = new Schema({
  _id: false,
  name: { type: String, trim: true, required: true, maxlength: 120, minlength: 3 },
});

const LanguageSchema = new Schema({
  _id: false,
  color: { type: String, trim: true, required: true, maxlength: 7, minlength: 4 },
  name: { type: String, trim: true, required: true, maxlength: 120, minlength: 3 },
});

const OwnerSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId, required: true },
  ref: { type: String, required: true, trim: true,  },
});

export const RepositorySchema = new Schema(
  {
    description: { type: String, trim: true, maxlength: 500, minlength: 3  },
    forkCount: { type: Number, required: true, min: 0 },
    licenseInfo: LiceseSchema,
    name: { type: String, trim: true, required: true, maxlength: 120, minlength: 3 },
    owner: { type: OwnerSchema, required: true },
    primaryLanguage: LanguageSchema,
    url: { type: String, trim: true, required: true, maxlength: 500, minlength: 5 },
  },
  { timestamps: true }
);


export const Repository = model('repositories', RepositorySchema);
