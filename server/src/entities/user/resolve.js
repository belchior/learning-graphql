import mongoose from 'mongoose';

import { User as UserModel } from './model';
import { Repository as RepositoryModel } from '../repository/model';
import { handleError } from '../../utils/error-handler';
import { paginationArrays, paginationBoundaries } from '../../utils/pagination';
import { userByLoginLoader } from './loader';


const handleInvalidId = fn => (...args) => {
  return mongoose.Types.ObjectId.isValid(args[1].id) === true
    ? fn(...args)
    : handleError(new Error(`Invalid args.: ${args[1].id}`));
};

const updateAttribute = async (Model, query, update, messageNotFound) => {
  const options = { new: true, runValidators: true };
  const handleNotFound = async data => {
    if (!data) return handleError(new Error(messageNotFound));
    return data;
  };

  return Model
    .findOneAndUpdate(query, update, options)
    .then(handleNotFound)
    .catch(handleError);
};


export const User = {
  followers: async parent => {
    const ids = parent.followers.map(item => item._id);
    const query = { _id: { $in: ids } };
    return UserModel.find(query).catch(handleError);
  },

  organizations: async (parent, args) => {
    const pagination = paginationArrays(args);
    return UserModel
      .aggregate([
        { $match: {
          _id: parent._id
        } },
        { $project: {
          _id: 0,
          organizations: {
            $slice: ['$organizations', pagination.skip, pagination.limit]
          },
        } },
        { $unwind: '$organizations' },
        { $project: {
          _id: '$organizations._id',
        } },
        { $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        } },
        { $replaceRoot: {
          newRoot: { $arrayElemAt: [ '$user', 0 ] }
        } },
        { $set: {
          id: { $toString: '$_id' }
        } },
      ])
      .catch(handleError);
  },

  repositories: async (parent, args) => {
    const pagination = paginationBoundaries(args);
    const query = { ownerId: parent._id };
    return RepositoryModel
      .find(query)
      .sort(pagination.sort)
      .skip(pagination.skip)
      .limit(pagination.limit)
      .catch(handleError);
  },

  starredRepositories: async (parent, args) => {
    const pagination = paginationArrays(args);
    return UserModel
      .aggregate([
        { $match: {
          _id: parent._id
        } },
        { $project: {
          _id: 0,
          starred: { $slice: [
            '$starredRepositories',
            pagination.skip,
            pagination.limit
          ] },
        } },
        { $unwind: '$starred' },
        { $project: {
          _id: '$starred._id',
        } },
        { $lookup: {
          from: 'repositories',
          localField: '_id',
          foreignField: '_id',
          as: 'repository'
        } },
        { $replaceRoot: {
          newRoot: { $arrayElemAt: [ '$repository', 0 ] }
        } },
        { $set: {
          id: { $toString: '$_id' }
        } },
      ])
      .catch(handleError);
  },
};


export const Query = {
  user: async (parent, args) => {
    return userByLoginLoader.load(args.login);
  },
};


export const Mutation = {
  addUserFollower: handleInvalidId((parent, args) => {
    const query = { _id: args.id };
    const update = { $addToSet: { followers: args.input } };
    return updateAttribute(UserModel, query, update, 'User not found');
  }),

  createUser: async (parent, args) => {
    const user = new UserModel(args.input);
    return user.save().catch(handleError);
  },

  removeUserFollower: handleInvalidId((parent, args) => {
    const query = { _id: args.id };
    const update = { $pull: { followers: { login: args.input } } };
    return updateAttribute(UserModel, query, update, 'User not found');
  }),

  updateUserName: handleInvalidId((parent, args) => {
    const query = { _id: args.id };
    const update = { $set: { name: args.input } };
    return updateAttribute(UserModel, query, update, 'User not found');
  }),
};
