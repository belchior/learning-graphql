import Dataloader from 'dataloader';
import { Types } from 'mongoose';

import { User as UserModel } from './model';
import { handleError } from '../../utils/error-handler';


export const userProjection = {
  followers: 0,
  following: 0,
  organizations: 0,
  starredRepositories: 0
};

const findUsersByIds = async (ids: readonly Types.ObjectId[]) => {
  const query: any = { _id: { $in: ids } };
  return UserModel
    .find(query, userProjection)
    .then(users => (
      ids.map(id => {
        const user = users.find(user => user._id === id);
        if (user) findUserByLogin.prime(user.login, user);
        return user;
      })
    ))
    .catch(handleError);
};

const findUsersByLogins = async (logins: readonly string[]) => {
  const query: any = { login: { $in: logins } };
  return UserModel
    .find(query, userProjection)
    .then(users => {
      return logins.map(login => {
        const user = users.find(user => user.login === login);
        if (user) findUserById.prime(user._id, user);
        return user;
      });
    })
    .catch(handleError);
};

export const findUserById = new Dataloader(findUsersByIds);
export const findUserByLogin = new Dataloader(findUsersByLogins);
