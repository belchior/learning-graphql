import { Document, model, Model, Schema, Types } from 'mongoose';

import { RepositoryOwnerSchema } from '../owner/model';
import { IDBRef } from '../interfaces';


interface ILicese extends Document {
  name: string
}
interface ILanguage extends Document {
  color: string
  name: string
}
export interface IRepositoryDocument extends Document {
  id: Types.ObjectId
  description: string
  forkCount: number
  licenseInfo: ILicese
  name: string
  owner: IDBRef
  primaryLanguage: ILanguage
  url: string
  __typename: 'Repository'
}

const LiceseSchema = new Schema({
  name: { type: String, trim: true, required: true, maxlength: 120, minlength: 3 },
}, { _id: false });

const LanguageSchema = new Schema({
  color: { type: String, trim: true, required: true, maxlength: 7, minlength: 4 },
  name: { type: String, trim: true, required: true, maxlength: 120, minlength: 3 },
}, { _id: false });

export const RepositorySchema = new Schema(
  {
    description: { type: String, trim: true, maxlength: 500, minlength: 3  },
    forkCount: { type: Number, required: true, min: 0 },
    licenseInfo: LiceseSchema,
    name: { type: String, trim: true, required: true, maxlength: 120, minlength: 3 },
    owner: { type: RepositoryOwnerSchema, required: true },
    primaryLanguage: LanguageSchema,
    url: { type: String, trim: true, required: true, maxlength: 500, minlength: 5 },
    __typename: { type: String, default: 'Repository' },
  },
  { timestamps: true }
);


export const Repository: Model<IRepositoryDocument> = model<IRepositoryDocument>('repositories', RepositorySchema);