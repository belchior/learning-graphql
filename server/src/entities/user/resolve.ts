import mongoose, { Types, Model as IModel, Document } from 'mongoose';

import { IOrganizationDocument } from '../organization/model';
import { IPaginationArgs, IUserOutput, TArgs } from '../../graphql/interfaces';
import { IRepositoryDocument, Repository as RepositoryModel } from '../repository/model';
import { IUserDocument, User as UserModel } from './model';
import { findUserByLogin } from './loader';
import { handleError, handleNotFound } from '../../utils/error-handler';
import { paginationArgs, getCursorPagination, } from '../../cursor-connection/referencePagination';


interface IUpdateAttributeConfig {
  Model: IModel<IUserDocument>
  query: object
  update: object
  messageNotFound: string
}
interface IPaginatedQueryUserFieldConfig {
  parent: IUserDocument
  args: IPaginationArgs
  fieldName: string
  collectionName: string
}

const handleInvalidId = (fn: (p: IUserOutput, a: any) => Promise<unknown>) => (...args: [IUserOutput, any]) => {
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
  const itemsPipeline = [
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
  ];
  const getPageInfoStage = (operator: string, key: Types.ObjectId) => ([
    { $match: { _id: parent._id } },
    { $project: { [fieldName]: 1 } },
    { $unwind: `$${fieldName}` },
    { $project: { _id: `$${fieldName}._id`, } },
    { $sort: pagination.sort },
    { $match: { _id: { [operator]: key } } },
  ]);

  return getCursorPagination<T>({
    Model: UserModel,
    getPageInfoStage,
    itemsPipeline,
  });
};

export const User = {
  id: async (parent: IUserDocument) => parent._id.toString(),

  followers: async (parent: IUserDocument, args: IPaginationArgs) => {
    try {
      const config = { parent, args, fieldName: 'followers', collectionName: 'users' };
      return paginatedQueryUserField<IUserDocument>(config);
    } catch (error) {
      return handleError(error);
    }
  },

  following: async (parent: IUserDocument, args: IPaginationArgs) => {
    try {
      const config = { parent, args, fieldName: 'following', collectionName: 'users' };
      return paginatedQueryUserField<IUserDocument>(config);
    } catch (error) {
      return handleError(error);
    }
  },

  organizations: async (parent: IUserDocument, args: IPaginationArgs) => {
    try {
      const config = { parent, args, fieldName: 'organizations', collectionName: 'organizations' };
      return paginatedQueryUserField<IOrganizationDocument>(config);
    } catch (error) {
      return handleError(error);
    }
  },

  repositories: async (parent: IUserDocument, args: IPaginationArgs) => {
    try {
      const pagination = paginationArgs(args);
      const itemsPipeline = [
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
      ];
      const getPageInfoStage = (operator: string, key: Types.ObjectId) => ([
        { $match: {
          'owner.ref': 'users',
          'owner._id': parent._id,
          _id: { [operator]: key },
        } }
      ]);

      return getCursorPagination<IRepositoryDocument>({
        Model: RepositoryModel,
        getPageInfoStage,
        itemsPipeline,
      });
    } catch (error) {
      return handleError(error);
    }
  },

  starredRepositories: async (parent: IUserDocument, args: IPaginationArgs) => {
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
    return findUserByLogin.load(args.login);
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
