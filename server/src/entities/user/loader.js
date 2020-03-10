import Dataloader from 'dataloader';

import { User as UserModel } from './model';
import { handleError } from '../../utils/error-handler';


const projection = { followers: 0, organizations: 0, starredRepositories: 0 };

const getUsersByIds = async ids => {
  const query = { _id: { $in: ids } };
  return UserModel
    .find(query, projection)
    .then(users => (
      ids.map(id => {
        const user = users.find(user => user.id === id.toString());
        userByLoginLoader.prime(user.login, user);
        return user;
      })
    ))
    .catch(handleError);
};

const getUsersByLogins = async logins => {
  const query = { login: { $in: logins } };
  return UserModel
    .find(query, projection)
    .then(users => (
      logins.map(login => {
        const user = users.find(user => user.login === login);
        userByIdLoader.prime(user.id, user);
        return user;
      })
    ))
    .catch(handleError);
};

export const userByIdLoader = new Dataloader(getUsersByIds);
export const userByLoginLoader = new Dataloader(getUsersByLogins);