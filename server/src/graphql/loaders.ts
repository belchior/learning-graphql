import Dataloader from 'dataloader';

import { TOrganization, TUser, TRepositoryOwner } from '../utils/interfaces';
import { findOrganizationsByLogins } from '../entities/organization/find';
import { findUsersByLogins } from '../entities/user/find';
import { findRepositoryOwners } from '../entities/repository/find';


export const createLoaders = () => ({
  findOrganizationByLogin: new Dataloader<string, TOrganization>(findOrganizationsByLogins),
  findRepositoryOwner: new Dataloader<string, TRepositoryOwner>(findRepositoryOwners),
  findUserByLogin: new Dataloader<string, TUser>(findUsersByLogins),
});
