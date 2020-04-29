import { Types } from 'mongoose';

import { IOrganizationDocument, Organization as OrganizationModel } from '../organization/model';
import { IPaginationArgs, TArgs, IGraphQLContext } from '../../graphql/interfaces';
import { IRepositoryDocument, Repository as RepositoryModel } from '../repository/model';
import { getCursorPagination, paginationArgs, } from '../../cursor-connection/referencePagination';
import { handleError } from '../../utils/error-handler';
import { userProjection } from '../user/find';


export const Organization = {
  people: async (parent: IOrganizationDocument, args: IPaginationArgs) => {
    const pagination = paginationArgs(args);
    const itemsPipeline = [
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
    ];
    const getPageInfoStage = (operator: string, key: Types.ObjectId) => ([
      { $match: { _id: parent._id } },
      { $project: { people: 1 } },
      { $unwind: '$people' },
      { $project: { _id: '$people._id', } },
      { $sort: pagination.sort },
      { $match: { _id: { [operator]: key } } },
    ]);

    return getCursorPagination<IRepositoryDocument>({
      Model: OrganizationModel,
      getPageInfoStage,
      itemsPipeline,
    });
  },

  repositories: async (parent: IOrganizationDocument, args: IPaginationArgs) => {
    try {
      const pagination = paginationArgs(args);
      const itemsPipeline = [
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
      ];
      const getPageInfoStage = (operator: string, key: Types.ObjectId) => ([
        { $match: {
          'owner.ref': 'organizations',
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
};

export const Query = {
  organization: async (parent: any, args: TArgs, context: IGraphQLContext) => {
    return context.loader.findOrganizationByLogin.load(args.login);
  }
};
