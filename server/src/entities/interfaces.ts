import { Types } from 'mongoose';


export type Ref = 'users' | 'organizations' | 'repositories';
export interface IDBRef {
  _id: Types.ObjectId,
  ref: Ref,
}
