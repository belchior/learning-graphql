import mongoose, { Types, Model as IModel, Document } from 'mongoose';

import { IOrganizationDocument } from '../organization/model';
import { IPaginationArgs, IUserOutput, TArgs } from '../../graphql/interfaces';
import { Repository as RepositoryModel, IRepositoryDocument } from '../repository/model';
import { User as UserModel, IUserDocument } from './model';
import {
  emptyCursorConnection,
  itemsToCursorConnection,
  paginationArgs,
} from '../../cursor-connection/referencePagination';
import { handleError, handleNotFound } from '../../utils/error-handler';
import { userByLoginLoader } from './loader';


interface IUpdateAttributeConfig {
  Model: IModel<IUserDocument>
  query: object
  update: object
  messageNotFound: string
}
interface IPaginatedQueryUserFieldConfig {
  parent: IUserOutput
  args: IPaginationArgs
  fieldName: string
  collectionName: string
}

const handleInvalidId =
  (fn: (p: IUserOutput, a: any) => Promise<unknown>) => (...args: [IUserOutput, any]) => {
    return mongoose.Types.ObjectId.isValid(args[1].id)
      ? fn(...args)
      : handleError(new Error(`Invalid args.: ${args[1].id}`));
  };

const updateAttribute = async (config: IUpdateAttributeConfig) => {
  const { Model, query, update, messageNotFound } = config;
  const options = { new: true, runValidators: true };
  return Model
    .findOneAndUpdate(query, update, options)
    .then(handleNotFound(messageNotFound))
    .catch(handleError);
};

const paginatedQueryUserField = async <T extends Document>(config: IPaginatedQueryUserFieldConfig) => {
  const { parent, args, fieldName, collectionName } = config;
  const pagination = paginationArgs(args);
  const items = await UserModel.aggregate([
    { $match: { _id: parent.id } },
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

  if (items.length === 0) return emptyCursorConnection<T>();

  const firstItem = items[0];
  const lastItem = items[items.length -1];

  const getQuery = (operator: string, key: Types.ObjectId) => ([
    { $match: { _id: parent.id } },
    { $project: { [fieldName]: 1 } },
    { $unwind: `$${fieldName}` },
    { $project: { _id: `$${fieldName}._id`, } },
    { $sort: pagination.sort },
    { $match: { _id: { [operator]: key } } },
  ]);

  const greaterThanStages = getQuery('$gt', lastItem.id);
  const lessThanStages = getQuery('$lt', firstItem.id);

  const cursorConnectionArgs = {
    Model: UserModel,
    greaterThanStages,
    lessThanStages,
    args,
    items,
  };

  // @ts-ignore
  return itemsToCursorConnection<T>(cursorConnectionArgs);
};

export const User = {
  followers: async (parent: IUserOutput, args: IPaginationArgs) => {
    try {
      const config = { parent, args, fieldName: 'followers', collectionName: 'users' };
      return paginatedQueryUserField<IUserDocument>(config);
    } catch (error) {
      return handleError(error);
    }
  },

  following: async (parent: IUserOutput, args: IPaginationArgs) => {
    try {
      const config = { parent, args, fieldName: 'following', collectionName: 'users' };
      return paginatedQueryUserField<IUserDocument>(config);
    } catch (error) {
      return handleError(error);
    }
  },

  organizations: async (parent: IUserOutput, args: IPaginationArgs) => {
    try {
      const config = { parent, args, fieldName: 'organizations', collectionName: 'organizations' };
      return paginatedQueryUserField<IOrganizationDocument>(config);
    } catch (error) {
      return handleError(error);
    }
  },

  repositories: async (parent: IUserOutput, args: IPaginationArgs) => {
    try {
      const pagination = paginationArgs(args);
      const items = await RepositoryModel.aggregate([
        { $match: {
          'owner.ref': 'users',
          'owner._id': parent.id,
          ...(pagination.key
            ? { _id: { [pagination.operator]: pagination.key } }
            : {}
          )
        } },
        { $sort : pagination.sort },
        { $limit : pagination.limit },
        { $sort : { _id: 1 } },
      ]);

      if (items.length === 0) return emptyCursorConnection<IRepositoryDocument>();

      const firstItem = items[0];
      const lastItem = items[items.length -1];

      const getStages = (operator: string, key: Types.ObjectId) => ([
        { $match: {
          'owner.ref': 'users',
          'owner._id': parent.id,
          _id: { [operator]: key },
        } }
      ]);
      const greaterThanStages = getStages('$gt', lastItem.id);
      const lessThanStages = getStages('$lt', firstItem.id);

      const cursorConnectionArgs = {
        Model: RepositoryModel,
        greaterThanStages,
        lessThanStages,
        args,
        items,
      };
      return itemsToCursorConnection<IRepositoryDocument>(cursorConnectionArgs);
    } catch (error) {
      return handleError(error);
    }
  },

  starredRepositories: async (parent: IUserOutput, args: IPaginationArgs) => {
    try {
      const config = { parent, args, fieldName: 'starredRepositories', collectionName: 'repositories' };
      return paginatedQueryUserField<IRepositoryDocument>(config);
    } catch (error) {
      return handleError(error);
    }
  },
};


export const Query = {
  user: async (parent: any, args: TArgs) => {
    return userByLoginLoader.load(args.login);
  },
};


export const Mutation = {
  addUserFollower: handleInvalidId(async (parent: any, args: any) => {
    const query = { _id: args.id };
    const update = { $addToSet: { followers: args.input } };
    const messageNotFound = 'User not found';
    const config = { Model: UserModel, query, update, messageNotFound };
    return updateAttribute(config);
  }),

  createUser: async (parent: any, args: any) => {
    const user = new UserModel(args.input);
    return user.save().catch(handleError);
  },

  removeUserFollower: handleInvalidId(async (parent: any, args: any) => {
    const query = { _id: args.id };
    const update = { $pull: { followers: { login: args.input } } };
    const messageNotFound = 'User not found';
    const config = { Model: UserModel, query, update, messageNotFound };
    return updateAttribute(config);
  }),

  updateUserName: handleInvalidId(async (parent: any, args: any) => {
    const query = { _id: args.id };
    const update = { $set: { name: args.input } };
    const messageNotFound = 'User not found';
    const config = { Model: UserModel, query, update, messageNotFound };
    return updateAttribute(config);
  }),
};
