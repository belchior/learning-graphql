import mongoose from 'mongoose';

import { Repository as RepositoryModel } from '../repository/model';
import { User as UserModel } from './model';
import {
  emptyCursorConnection,
  itemsToCursorConnection,
  paginationArgs,
} from '../../cursor-connection/referencePagination';
import { handleError, handleNotFound } from '../../utils/error-handler';
import { userByLoginLoader } from './loader';


const handleInvalidId = fn => (...args) => {
  return mongoose.Types.ObjectId.isValid(args[1].id) === true
    ? fn(...args)
    : handleError(new Error(`Invalid args.: ${args[1].id}`));
};

const updateAttribute = async (Model, query, update, messageNotFound) => {
  const options = { new: true, runValidators: true };

  return Model
    .findOneAndUpdate(query, update, options)
    .then(handleNotFound(messageNotFound))
    .catch(handleError);
};

const paginatedQueryUserField = async (parent, args, fieldName, collectionName) => {
  const pagination = paginationArgs(args);
  const items = await UserModel.aggregate([
    { $match: { _id: parent._id } },
    { $unwind: `$${fieldName}` },
    { $project: { _id: `$${fieldName}._id`, } },
    { $sort: pagination.sort },
    ...(pagination.key
      ? [ { $match: { _id: { [pagination.operator]: pagination.key } } } ]
      : []
    ),
    { $limit: pagination.limit },
    { $sort: { _id: 1 } },
    { $lookup: {
      from: collectionName,
      localField: '_id',
      foreignField: '_id',
      as: 'item'
    } },
    { $replaceRoot: {
      newRoot: {
        $arrayElemAt: [ '$item', 0 ]
      }
    } },
  ]);

  if (items.length === 0) return emptyCursorConnection;

  const firstItem = items[0];
  const lastItem = items[items.length -1];

  const getQuery = (operator, key) => ([
    { $match: { _id: parent._id } },
    { $project: { [fieldName]: 1 } },
    { $unwind: `$${fieldName}` },
    { $project: { _id: `$${fieldName}._id`, } },
    { $sort: pagination.sort },
    { $match: { _id: { [operator]: key } } },
  ]);

  const greaterThanStages = getQuery('$gt', lastItem._id);
  const lessThanStages = getQuery('$lt', firstItem._id);

  const cursorConnectionArgs = {
    Model: UserModel,
    greaterThanStages,
    lessThanStages,
    args,
    items,
  };
  return itemsToCursorConnection(cursorConnectionArgs);
};

export const User = {
  followers: async (parent, args) => {
    try {
      return paginatedQueryUserField(parent, args, 'followers', 'users');
    } catch (error) {
      return handleError(error);
    }
  },

  following: async (parent, args) => {
    try {
      return paginatedQueryUserField(parent, args, 'following', 'users');
    } catch (error) {
      return handleError(error);
    }
  },

  organizations: async (parent, args) => {
    try {
      return paginatedQueryUserField(parent, args, 'organizations', 'organizations');
    } catch (error) {
      return handleError(error);
    }
  },

  repositories: async (parent, args) => {
    try {
      const pagination = paginationArgs(args);
      const items = await RepositoryModel.aggregate([
        { $match: {
          'owner.ref': 'users',
          'owner._id': parent._id,
          ...(pagination.key
            ? { _id: { [pagination.operator]: pagination.key } }
            : {}
          )
        } },
        { $sort : pagination.sort },
        { $limit : pagination.limit },
        { $sort : { _id: 1 } },
      ]);

      if (items.length === 0) return emptyCursorConnection;

      const firstItem = items[0];
      const lastItem = items[items.length -1];

      const getStages = (operator, key) => ([
        { $match: {
          'owner.ref': 'users',
          'owner._id': parent._id,
          _id: { [operator]: key },
        } }
      ]);
      const greaterThanStages = getStages('$gt', lastItem._id);
      const lessThanStages = getStages('$lt', firstItem._id);

      const cursorConnectionArgs = {
        Model: RepositoryModel,
        greaterThanStages,
        lessThanStages,
        args,
        items,
      };
      return itemsToCursorConnection(cursorConnectionArgs);
    } catch (error) {
      return handleError(error);
    }
  },

  starredRepositories: async (parent, args) => {
    try {
      return paginatedQueryUserField(parent, args, 'starredRepositories', 'repositories');
    } catch (error) {
      return handleError(error);
    }
  },
};


export const Query = {
  user: async (parent, args) => {
    return userByLoginLoader.load(args.login);
  },
};


export const Mutation = {
  addUserFollower: handleInvalidId(async (parent, args) => {
    const query = { _id: args.id };
    const update = { $addToSet: { followers: args.input } };
    return updateAttribute(UserModel, query, update, 'User not found');
  }),

  createUser: async (parent, args) => {
    const user = new UserModel(args.input);
    return user.save().catch(handleError);
  },

  removeUserFollower: handleInvalidId(async (parent, args) => {
    const query = { _id: args.id };
    const update = { $pull: { followers: { login: args.input } } };
    return updateAttribute(UserModel, query, update, 'User not found');
  }),

  updateUserName: handleInvalidId(async (parent, args) => {
    const query = { _id: args.id };
    const update = { $set: { name: args.input } };
    return updateAttribute(UserModel, query, update, 'User not found');
  }),
};
