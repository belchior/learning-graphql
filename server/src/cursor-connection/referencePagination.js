import mongoose from 'mongoose';

import { base64ToString, stringToBase64 } from '../utils/converter';
import { validateArgs } from './arguments';


/*
  forward pagination argument
  first = 3
  after = CURSOR -> 01

  previousPage          nextPage
       |                   |
  |----|----|----|----|----|----|----|----|----|----
  | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09
  |----|----|----|----|----|----|----|----|----|----
       |    |_____________|
     CURSOR        3


  backward pagination argument
  last   = 3
  before = CURSOR -> 08
                 previousPage          nextPage
                      |                   |
  |----|----|----|----|----|----|----|----|----|----
  | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09
  |----|----|----|----|----|----|----|----|----|----
                           |_____________||
                                  3     CURSOR
*/


export const cursorToKey = (cursor) => mongoose.Types.ObjectId(base64ToString(cursor));
export const keyToCursor = (key) => stringToBase64(key.toString());

const forwardPagination = (args) => ({
  limit: args.first,
  operator: '$gt',
  key: args.after ? cursorToKey(args.after) : undefined,
  sort: { _id: 1 },
});

const backwardPagination = (args) => ({
  limit: args.last,
  operator: '$lt',
  key: args.before ? cursorToKey(args.before) : undefined,
  sort: { _id: -1 },
});

export const paginationArgs = validateArgs((args) => (
  args.first
    ? forwardPagination(args)
    : backwardPagination(args)
));

export const emptyCursorConnection = () => ({
  edges: [],
  pageInfo: {
    hasPreviousPage: false,
    hasNextPage: false,
  }
});

export async function getCursorPagination (config) {
  const { Model, getPageInfoStage, itemsPipeline } = config;

  const items = await Model.aggregate(itemsPipeline);
  if (items.length === 0) return emptyCursorConnection();

  const pageInfo = await getPageInfo({ Model, getPageInfoStage, items, });
  const edges = getEdges(items);

  return { pageInfo, edges };
}

function getEdges (items) {
  return items.map((value) => ({
    cursor: keyToCursor(value._id),
    node: value,
  }));
}

async function getPageInfo(config) {
  const { Model, getPageInfoStage, items } = config;

  const firstItem = items[0];
  const lastItem = items[items.length -1];
  const stagePrevious = getPageInfoStage('$lt', firstItem._id);
  const stageNext = getPageInfoStage('$gt', lastItem._id);
  const pipeline = getPageInfoPipeline({ stagePrevious, stageNext, });

  const [data] = await Model.aggregate(pipeline);
  const pageInfo = {
    endCursor: keyToCursor(items[items.length -1]._id),
    hasNextPage: data.hasNextPage,
    hasPreviousPage: data.hasPreviousPage,
    startCursor: keyToCursor(items[0]._id),
  };
  return pageInfo;
}

function getPageInfoPipeline(config) {
  const { stagePrevious, stageNext } = config;

  return [
    { '$facet': {
      'previous': [
        ...stagePrevious,
        { '$count': 'count' },
      ],
      'next': [
        ...stageNext,
        { '$count': 'count' },
      ],
    } },
    { '$project': {
      'previous': {
        '$ifNull': [{ '$arrayElemAt': ['$previous.count', 0] }, 0 ]
      },
      'next': {
        '$ifNull': [{ '$arrayElemAt': ['$next.count', 0] }, 0 ]
      },
    } },
    { '$project': {
      'hasPreviousPage': {
        '$cond': [ { '$gt': [ '$previous', 0 ] }, true, false ]
      },
      'hasNextPage': {
        '$cond': [{ '$gt': [ '$next', 0 ] }, true, false]
      }
    } }
  ];
}
