import Dataloader from 'dataloader';

import { User as UserModel } from '../entities/user/model';


const getUsersByIds = async ids => {
  const query = { _id: { $in: ids } };
  const projection = { followers: 0, organizations: 0 };
  return UserModel
    .find(query, projection)
    .then(users => (
      ids.map(id => {
        const user = users.find(user => user.id === id.toString());
        userByLoginLoader.prime(user.login, user);
        return user;
      })
    ));
};

const getUsersByLogins = logins => {
  const query = { login: { $in: logins } };
  const projection = { followers: 0, organizations: 0, starredRepositories: 0 };
  return UserModel
    .find(query, projection)
    .then(users => (
      logins.map(login => {
        const user = users.find(user => user.login === login);
        userByIdLoader.prime(user.id, user);
        return user;
      })
    ));
};

export const userByIdLoader = new Dataloader(getUsersByIds);
export const userByLoginLoader = new Dataloader(getUsersByLogins);
