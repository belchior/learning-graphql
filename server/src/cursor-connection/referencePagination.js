import mongoose from 'mongoose';

import { base64ToString, stringToBase64 } from '../utils/converter';
import { validateArgs } from './arguments';


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


export const cursorToKey = cursor => mongoose.Types.ObjectId(base64ToString(cursor));
export const keyToCursor = key => stringToBase64(key.toString());

const forwardPagination = args => ({
  limit: args.first,
  operator: '$gt',
  key: args.after ? cursorToKey(args.after) : undefined,
  sort: { _id: 1 },
});

const backwardPagination = args => ({
  limit: args.last,
  operator: '$lt',
  key: args.before ? cursorToKey(args.before) : undefined,
  sort: { _id: -1 },
});

export const paginationArgs = validateArgs(args => {
  return args.first
    ? forwardPagination(args)
    : backwardPagination(args);
});

export const emptyCursorConnection = {
  edges: [],
  pageInfo: {
    endCursor: '',
    hasPreviousPage: false,
    hasNextPage: false,
    startCursor: '',
  }
};

export const getPageInfo = async (Model, items, aggregationPrev, aggregationNext) => {
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

export const itemsToCursorConnection = async cursorConnectionArgs => {
  const { Model, args, items, greaterThanStages, lessThanStages } = cursorConnectionArgs;

  const pageInfo = args.first
    ? await getPageInfo(Model, items, lessThanStages, greaterThanStages)
    : await getPageInfo(Model, items, greaterThanStages, lessThanStages);

  const cursorConnection = {
    edges: items.map(value => ({
      cursor: keyToCursor(value._id),
      node: value,
    })),
    pageInfo,
  };

  return cursorConnection;
};
