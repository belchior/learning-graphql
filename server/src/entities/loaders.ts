import Dataloader from 'dataloader';

import { IUser } from '../utils/interfaces';
import { findUsersByLogins } from './user/find';


export const createLoaders = () => ({
  findUserByLogin: new Dataloader<string, IUser>(findUsersByLogins),
});
