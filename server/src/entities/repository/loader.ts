import Dataloader from 'dataloader';

import { User as UserModel } from '../user/model';
import { Organization as OrganizationModel } from '../organization/model';
import { handleError } from '../../utils/error-handler';
import { userProjection } from '../user/loader';

export const getRepositoryOwner = async serializedOwners => {
  const owners = serializedOwners.map(item => JSON.parse(item));

  const ids = {
    users: [],
    organizations: [],
  };

  for (const owner of owners) {
    ids[owner.ref].push(owner._id);
  }

  const promises = [
    ids.users.length > 0
      ? UserModel.find({ _id: { $in: ids.users } }, userProjection)
      : [],
    ids.organizations.length > 0
      ? OrganizationModel.find({ _id: { $in: ids.organizations } })
      : []
  ];

  return Promise.all(promises)
    .then(items => items.flat())
    .catch(handleError);
};

export const repositoryOwnerLoader = new Dataloader(getRepositoryOwner);
