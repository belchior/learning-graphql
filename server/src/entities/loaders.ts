import Dataloader from 'dataloader';

import { findOrganizationsByLogins } from './organization/find';
import { findRepositoriesOwners } from './repository/find';
import { findUsersByIds, findUsersByLogins } from './user/find';


export const createLoaders = () => ({
  findOrganizationByLogin: new Dataloader(findOrganizationsByLogins),
  findRepositoryOwner: new Dataloader(findRepositoriesOwners),
  findUserById: new Dataloader(findUsersByIds),
  findUserByLogin: new Dataloader(findUsersByLogins),
});
