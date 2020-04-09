import { Types } from 'mongoose';

import { Repository as RepositoryModel, IRepositoryDocument } from '../repository/model';
import { Organization as OrganizationModel, IOrganizationDocument } from '../organization/model';
import {
  emptyCursorConnection,
  itemsToCursorConnection,
  paginationArgs,
} from '../../cursor-connection/referencePagination';
import { findOrganizationByLogin } from './loader';
import { handleError } from '../../utils/error-handler';
import { userProjection } from '../user/loader';
import { IPaginationArgs, TArgs } from '../../graphql/interfaces';

export const Organization = {
  people: async (parent: IOrganizationDocument, args: IPaginationArgs) => {
    const pagination = paginationArgs(args);
    const items = await OrganizationModel.aggregate<IOrganizationDocument>([
      { $match: { _id: parent._id } },
      { $unwind: '$people' },
      { $project: { _id: '$people._id', } },
      { $sort: pagination.sort },
      ...(pagination.key
        ? [ { $match: { _id: { [pagination.operator]: pagination.key } } } ]
        : []
      ),
      { $limit: pagination.limit },
      { $sort: { _id: 1 } },
      { $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'item'
      } },
      { $replaceRoot: {
        newRoot: {
          $arrayElemAt: [ '$item', 0 ]
        }
      } },
      { $project: userProjection }
    ]);

    if (items.length === 0) return emptyCursorConnection<IOrganizationDocument>();

    const firstItem = items[0];
    const lastItem = items[items.length -1];

    const getQuery = (operator: string, key: Types.ObjectId) => ([
      { $match: { _id: parent._id } },
      { $project: { people: 1 } },
      { $unwind: '$people' },
      { $project: { _id: '$people._id', } },
      { $sort: pagination.sort },
      { $match: { _id: { [operator]: key } } },
    ]);

    const greaterThanStages = getQuery('$gt', lastItem._id);
    const lessThanStages = getQuery('$lt', firstItem._id);

    const cursorConnectionArgs = {
      Model: OrganizationModel,
      greaterThanStages,
      lessThanStages,
      args,
      items,
    };
    return itemsToCursorConnection<IOrganizationDocument>(cursorConnectionArgs);
  },

  repositories: async (parent: IOrganizationDocument, args: IPaginationArgs) => {
    try {
      const pagination = paginationArgs(args);
      const items = await RepositoryModel.aggregate<IRepositoryDocument>([
        { $match: {
          'owner.ref': 'organizations',
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

      if (items.length === 0) return emptyCursorConnection<IRepositoryDocument>();

      const firstItem = items[0];
      const lastItem = items[items.length -1];

      const getStages = (operator: string, key: Types.ObjectId) => ([
        { $match: {
          'owner.ref': 'organizations',
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
      return itemsToCursorConnection<IRepositoryDocument>(cursorConnectionArgs);
    } catch (error) {
      return handleError(error);
    }
  },
};

export const Query = {
  organization: async (parent: any, args: TArgs) => {
    return findOrganizationByLogin.load(args.login);
  }
};
