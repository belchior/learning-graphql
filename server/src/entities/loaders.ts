import Dataloader from 'dataloader';

import { TOrganization, TUser } from '../utils/interfaces';
import { findOrganizationsByLogins } from './organization/find';
import { findUsersByLogins } from './user/find';


export const createLoaders = () => ({
  findOrganizationByLogin: new Dataloader<string, TOrganization>(findOrganizationsByLogins),
  findUserByLogin: new Dataloader<string, TUser>(findUsersByLogins),
});
