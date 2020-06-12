import { User as UserModel } from './model';
import { handleError } from '../../utils/error-handler';


export const userProjection = {
  followers: 0,
  following: 0,
  organizations: 0,
  starredRepositories: 0
};

export const findUsersByIds = async (ids) => {
  const query = { _id: { $in: ids } };
  return UserModel
    .find(query, userProjection)
    .then(users => (
      ids.map(id => users.find(user => user._id === id))
    ))
    .catch(handleError);
};

export const findUsersByLogins = async (logins) => {
  const query = { login: { $in: logins } };
  return UserModel
    .find(query, userProjection)
    .then(users => (
      logins.map(login => users.find(user => user.login === login))
    ))
    .catch(handleError);
};

