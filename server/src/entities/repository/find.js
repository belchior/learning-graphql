import { Organization as OrganizationModel } from '../organization/model';
import { User as UserModel } from '../user/model';
import { handleError } from '../../utils/error-handler';
import { userProjection } from '../user/find';


const unserializeOwners = (serializedOwners) => {
  return serializedOwners.map(item => JSON.parse(item));
};

const idsOfOwners = (owners) => {
  const ids = {
    users: [],
    organizations: [],
  };

  for (const owner of owners) {
    ids[owner.ref].push(owner._id);
  }

  return ids;
};

export const findRepositoriesOwners = async (serializedOwners) => {
  const ids = idsOfOwners(unserializeOwners(serializedOwners));

  const organizationsPromise = ids.organizations.length > 0
    ? OrganizationModel.find({ _id: { $in: ids.organizations } })
    : [];

  const usersPromise = ids.users.length > 0
    ? UserModel.find({ _id: { $in: ids.users } }, userProjection)
    : [];

  try {
    const result = await Promise.all([usersPromise, organizationsPromise]);
    const items = result.flat();
    return items;
  } catch (error) {
    return handleError(error);
  }
};
