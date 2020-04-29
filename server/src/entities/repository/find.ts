import { Types } from 'mongoose';

import { Organization as OrganizationModel, IOrganizationDocument } from '../organization/model';
import { Ref } from '../interfaces';
import { User as UserModel, IUserDocument } from '../user/model';
import { handleError } from '../../utils/error-handler';
import { userProjection } from '../user/find';


type TProfileOwnerRef = Exclude<Ref, 'repositories'>
type TProfileOwnerDBRef = { _id: Types.ObjectId, ref: TProfileOwnerRef }
type TProfileOwnerIds = Record<TProfileOwnerRef, Types.ObjectId[]>

const unserializeOwners = (serializedOwners: readonly string[]): TProfileOwnerDBRef[] => {
  return serializedOwners.map(item => JSON.parse(item));
};

const idsOfOwners = (owners: TProfileOwnerDBRef[]) => {
  const ids: TProfileOwnerIds = {
    users: [],
    organizations: [],
  };

  for (const owner of owners) {
    ids[owner.ref].push(owner._id);
  }

  return ids;
};

export const findRepositoriesOwners = async (serializedOwners: readonly string[]) => {
  const ids = idsOfOwners(unserializeOwners(serializedOwners));

  const organizationsPromise = ids.organizations.length > 0
    ? OrganizationModel.find({ _id: { $in: ids.organizations } })
    : [];

  const usersPromise = ids.users.length > 0
    ? UserModel.find({ _id: { $in: ids.users } }, userProjection)
    : [];

  try {
    const result = await Promise.all([usersPromise, organizationsPromise]);
    const items: Array<IUserDocument | IOrganizationDocument> = result.flat();
    return items;
  } catch (error) {
    return handleError(error);
  }
};
