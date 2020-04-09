import { Schema } from 'mongoose';

import { IDBRef } from '../interfaces';


export const RepositoryOwnerSchema = new Schema<IDBRef>({
  _id: { type: Schema.Types.ObjectId, required: true },
  ref: { type: String, required: true, trim: true,  },
});
