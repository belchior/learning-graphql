import mongoose from 'mongoose';

import { Repository as RepositoryModel } from '../repository/model';
import { User as UserModel } from './model';
import { handleError, handleNotFound } from '../../utils/error-handler';
import { paginationArrays, paginationBoundaries, } from '../../utils/pagination';
import { userByLoginLoader } from './loader';
import {
  valuesToCursorConnection,
  arrayIndexPagination,
} from '../../cursor-connection/indexPagination';


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

export const User = {
  followers: async (parent, args) => {
    const pagination = paginationArrays(args);
    return UserModel
      .aggregate([
        { $match: {
          _id: parent._id
        } },
        { $project: {
          _id: 0,
          followers: {
            $slice: ['$followers', pagination.skip, pagination.limit]
          },
        } },
        { $unwind: '$followers' },
        { $project: {
          _id: '$followers._id',
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

  following: async (parent, args) => {
    const pagination = paginationArrays(args);
    return UserModel
      .aggregate([
        { $match: {
          _id: parent._id
        } },
        { $project: {
          _id: 0,
          following: {
            $slice: ['$following', pagination.skip, pagination.limit]
          },
        } },
        { $unwind: '$following' },
        { $project: {
          _id: '$following._id',
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

  organizations: async (parent, args) => {
    const pagination = arrayIndexPagination(args);
    return UserModel
      .aggregate([
        { $match: { _id: parent._id } },
        { $project: {
          _id: 0,
          organizations: 1,
          size: { $size: '$organizations' },
          orgs: {
            $slice: ['$organizations', pagination.skip, pagination.limit]
          }
        } },
        { $project: {
          size: 1,
          items: {
            $map: {
              input: '$orgs',
              as: 'item',
              in: {
                _id: '$$item._id',
                key: {
                  $concat: [
                    {
                      $toString: {
                        $indexOfArray: ['$organizations', '$$item']
                      }
                    },
                    '|',
                    {
                      $toString: {
                        $subtract: [
                          { $indexOfArray: ['$organizations', '$$item'] },
                          '$size'
                        ]
                      }
                    }
                  ]
                }
              }
            }
          }
        } },
        { $unwind: '$items' },
        { $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ size: '$size' }, '$items']
          }
        } },
        { $lookup: {
          from: 'organizations',
          localField: '_id',
          foreignField: '_id',
          as: 'orgs'
        } },
        { $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              { key: '$key', size: '$size' },
              { $arrayElemAt: ['$orgs', 0] }
            ]
          }
        } },
        { $set: { id: { $toString: '$_id' } } },
      ])
      .then(values => valuesToCursorConnection(values, args))
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
