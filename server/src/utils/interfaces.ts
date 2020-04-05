import { Types } from 'mongoose';


export interface IDBRef {
  _id: Types.ObjectId,
  ref?: string,
}
