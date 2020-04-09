import mongoose, { Types, Model as IModel, Document } from 'mongoose';

import { base64ToString, stringToBase64 } from '../utils/converter';
import { validateArgs } from './arguments';
import { IPageInfo, IPaginationArgs, ICursorConnection } from '../graphql/interfaces';


/*
  forward pagination argument
  first = 3
  after = CURSOR -> 01
  |----|----|----|----|----|----|----|----|----|----
  | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09
  |----|----|----|----|----|----|----|----|----|----
       |    |_____________|
     CURSOR        3

  backward pagination argument
  last   = 3
  before = CURSOR -> 08
  |----|----|----|----|----|----|----|----|----|----
  | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09
  |----|----|----|----|----|----|----|----|----|----
                           |_____________||
                                  3     CURSOR
*/


export interface IItemsToCursorConnectionConfig<T extends Document> {
  Model: IModel<T>
  args: IPaginationArgs
  items: T[]
  greaterThanStages: object[]
  lessThanStages: object[]
}

export const cursorToKey = (cursor: string) => mongoose.Types.ObjectId(base64ToString(cursor));
export const keyToCursor = (key: Types.ObjectId) => stringToBase64(key.toString());

const forwardPagination = (args: IPaginationArgs) => ({
  limit: args.first,
  operator: '$gt',
  key: args.after ? cursorToKey(args.after) : undefined,
  sort: { _id: 1 },
});

const backwardPagination = (args: IPaginationArgs) => ({
  limit: args.last,
  operator: '$lt',
  key: args.before ? cursorToKey(args.before) : undefined,
  sort: { _id: -1 },
});

export const paginationArgs = validateArgs((args: IPaginationArgs) => {
  return args.first
    ? forwardPagination(args)
    : backwardPagination(args);
});

export const emptyCursorConnection = <T>(): ICursorConnection<T> => ({
  edges: [],
  pageInfo: {
    hasPreviousPage: false,
    hasNextPage: false,
  }
});

export const getPageInfo = async (
  Model: IModel<Document>,
  items: Document[],
  aggregationPrev: any[],
  aggregationNext: any[]
): Promise<IPageInfo> => {
  return Model
    .aggregate([
      { $facet: {
        previous: [
          ...aggregationPrev,
          { $count: 'count' },
        ],
        next: [
          ...aggregationNext,
          { $count: 'count' },
        ],
      } },
      { $project: {
        previous: {
          $ifNull: [{ $arrayElemAt: ['$previous.count', 0] }, 0 ]
        },
        next: {
          $ifNull: [{ $arrayElemAt: ['$next.count', 0] }, 0 ]
        },
      } },
      { $project: {
        hasPreviousPage: {
          $cond: [ { $gt: [ '$previous', 0 ] }, true, false ]
        },
        hasNextPage: {
          $cond: [{ $gt: [ '$next', 0 ] }, true, false]
        }
      } }
    ])
    .then(([data]) => ({
      endCursor: keyToCursor(items[items.length -1]._id),
      hasNextPage: data.hasNextPage,
      hasPreviousPage: data.hasPreviousPage,
      startCursor: keyToCursor(items[0]._id),
    }));
};

export const itemsToCursorConnection =
  async <T extends Document>(config: IItemsToCursorConnectionConfig<T>): Promise<ICursorConnection<T>> => {
    const { Model, args, items, greaterThanStages, lessThanStages } = config;

    const pageInfo = args.first
      ? await getPageInfo(Model, items, lessThanStages, greaterThanStages)
      : await getPageInfo(Model, items, greaterThanStages, lessThanStages);

    const edges = items.map(value => ({
      cursor: keyToCursor(value._id),
      node: value,
    }));

    return { pageInfo, edges };
  };
