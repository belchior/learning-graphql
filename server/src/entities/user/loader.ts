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

const getUsersByIds = async (ids: readonly Types.ObjectId[]) => {
  const query: any = { _id: { $in: ids } };
  return UserModel
    .find(query, userProjection)
    .then(users => (
      ids.map(id => {
        const user = users.find(user => user.id === id);
        if (user) userByLoginLoader.prime(user.login, user);
        return user;
      })
    ))
    .catch(handleError);
};

const getUsersByLogins = async (logins: readonly string[]) => {
  const query: any = { login: { $in: logins } };
  return UserModel
    .find(query, userProjection)
    .then(users => {
      return logins.map(login => {
        const user = users.find(user => user.login === login);
        if (user) userByIdLoader.prime(user.id, user);
        return user;
      });
    })
    .catch(handleError);
};

export const userByIdLoader = new Dataloader(getUsersByIds);
export const userByLoginLoader = new Dataloader(getUsersByLogins);
