import { Document, model, Schema } from 'mongoose';

import { IDBRef } from '../../utils/interfaces';


interface IUser extends Document {
  avatarUrl: string
  bio: string
  company: string
  email: string
  followers: IDBRef[]
  location: string
  login: string
  name: string
  organizations: IDBRef[]
  starredRepositories: IDBRef[]
  url: string
  websiteUrl: string
  __typename: 'User'
}

const UserSchema = new Schema(
  {
    avatarUrl: { type: String, trim: true, required: true },
    bio: { type: String, trim: true, maxlength: 500, minlength: 3  },
    company: { type: String, trim: true, maxlength: 120, minlength: 3 },
    email: { type: String, trim: true, required: true, maxlength: 120, minlength: 3 },
    followers: [{ _id: Schema.Types.ObjectId }],
    location: { type: String, trim: true, maxlength: 120, minlength: 3 },
    login: { type: String, trim: true, required: true, unique: true, maxlength: 120, minlength: 3 },
    name: { type: String, trim: true, maxlength: 120, minlength: 3 },
    organizations: [{ _id: Schema.Types.ObjectId }],
    starredRepositories: [{ _id: Schema.Types.ObjectId }],
    url: { type: String, trim: true, required: true, maxlength: 500, minlength: 5 },
    websiteUrl: { type: String, trim: true, maxlength: 500, minlength: 5 },
    __typename: { type: String, default: 'User' },
  },
  { timestamps: true }
);
export const User = model<IUser>('users', UserSchema);
