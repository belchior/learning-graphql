import { Document, model, Model, Schema } from 'mongoose';

import { IDBRef } from '../../utils/interfaces';

export interface IOrganizationDocument extends Document {
  avatarUrl: string
  description: string
  email: string
  location: string
  login: string
  name: string
  people: IDBRef[]
  url: string
  websiteUrl: string
  __typename: 'Organization'
}

const OrganizationSchema = new Schema(
  {
    avatarUrl: { type: String, trim: true, required: true },
    description: { type: String, trim: true, maxlength: 500, minlength: 3  },
    email: { type: String, trim: true, maxlength: 120, minlength: 3 },
    location: { type: String, trim: true, maxlength: 120, minlength: 3 },
    login: { type: String, trim: true, required: true, unique: true, maxlength: 120, minlength: 3 },
    name: { type: String, trim: true, maxlength: 120, minlength: 3 },
    people: [{ _id: Schema.Types.ObjectId, ref: String }],
    url: { type: String, trim: true, required: true, maxlength: 500, minlength: 5 },
    websiteUrl: { type: String, trim: true, maxlength: 500, minlength: 5 },
    __typename: { type: String, default: 'Organization' },
  },
  { timestamps: true }
);

export const Organization: Model<IOrganizationDocument> = model<IOrganizationDocument>(
  'organizations',
  OrganizationSchema
);
