import Dataloader from 'dataloader';
import { Types } from 'mongoose';

import { User as UserModel } from '../user/model';
import { Organization as OrganizationModel } from '../organization/model';
import { handleError } from '../../utils/error-handler';
import { userProjection } from '../user/loader';
import { IDBRef } from '../interfaces';
import { IRepositoryDocument } from './model';

const unserializeOwners = (serializedOwners: readonly string[]) => serializedOwners.map(item => JSON.parse(item));

const findRepositoriesOwners = async (serializedOwners: readonly string[]): Promise<IRepositoryDocument[]> => {
  const owners: IDBRef[] = unserializeOwners(serializedOwners);

  const ids: { [key: string]: Types.ObjectId[] } = {
    users: [],
    organizations: [],
  };

  for (const owner of owners) {
    ids[owner.ref].push(owner._id);
  }

  const usersPromise = ids.users.length > 0
    ? UserModel.find({ _id: { $in: ids.users } }, userProjection)
    : Promise.resolve([]);

  const organizationsPromise = ids.organizations.length > 0
    ? OrganizationModel.find({ _id: { $in: ids.organizations } })
    : Promise.resolve([]);

  return Promise.all([usersPromise, organizationsPromise])
    .then(items => items.flat())
    .catch(handleError);
};

export const findRepositoryOwner = new Dataloader(findRepositoriesOwners);
