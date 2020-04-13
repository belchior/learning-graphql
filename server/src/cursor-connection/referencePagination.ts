import mongoose, { Types, Model as IModel, Document } from 'mongoose';

import { IEdge, IPageInfo, IPaginationArgs, ICursorConnection } from '../graphql/interfaces';
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

interface IGetCursorPaginationConfig {
  Model: IModel<any>
  getPageInfoStage: ((operator: ('$gt' | '$lt'), key: Types.ObjectId) => object[]),
  itemsPipeline: object[]
}

interface IGetPageInfoNew<T extends Document> {
  Model: IModel<T>
  getPageInfoStage: ((operator: ('$gt' | '$lt'), key: Types.ObjectId) => object[]),
  items: T[]
}

interface IGetPageInfoPipelineConfig {
  stagePrevious: object[]
  stageNext: object[]
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

export const paginationArgs = validateArgs((args: IPaginationArgs) => (
  args.first
    ? forwardPagination(args)
    : backwardPagination(args)
));

export const emptyCursorConnection = <T>(): ICursorConnection<T> => ({
  edges: [],
  pageInfo: {
    hasPreviousPage: false,
    hasNextPage: false,
  }
});

export async function getCursorPagination <T extends Document>(
  config: IGetCursorPaginationConfig
): Promise<ICursorConnection<T>> {
  const { Model, getPageInfoStage, itemsPipeline } = config;

  const items = await Model.aggregate(itemsPipeline);
  if (items.length === 0) return emptyCursorConnection();

  const pageInfo = await getPageInfoNew({ Model, getPageInfoStage, items, });
  const edges = getEdges<T>(items);

  return { pageInfo, edges };
}

function getEdges <T extends Document>(items: T[]): IEdge<T>[] {
  return items.map((value) => ({
    cursor: keyToCursor(value._id),
    node: value,
  }));
}

async function getPageInfoNew<T extends Document>(config: IGetPageInfoNew<T>) {
  const { Model, getPageInfoStage, items } = config;

  const firstItem = items[0];
  const lastItem = items[items.length -1];
  const stagePrevious = getPageInfoStage('$lt', firstItem._id);
  const stageNext = getPageInfoStage('$gt', lastItem._id);
  const pipeline = getPageInfoPipeline({ stagePrevious, stageNext, });

  const [data] = await Model.aggregate(pipeline);
  const pageInfo: IPageInfo = {
    endCursor: keyToCursor(items[items.length -1]._id),
    hasNextPage: data.hasNextPage,
    hasPreviousPage: data.hasPreviousPage,
    startCursor: keyToCursor(items[0]._id),
  };
  return pageInfo;
}

function getPageInfoPipeline(config: IGetPageInfoPipelineConfig) {
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
