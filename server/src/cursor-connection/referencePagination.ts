import { base64ToString, stringToBase64 } from '../utils/converter';
import {
  ICursorConnection,
  ICursorConnectionConfig,
  IEdge,
  IPageInfo,
  TEntity,
  IPaginationArgs,
} from '../utils/interfaces';
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


export const cursorToKey = base64ToString;
export const keyToCursor = stringToBase64;

export const emptyCursorConnection = <T>(): ICursorConnection<T> => ({
  edges: [],
  pageInfo: {
    hasPreviousPage: false,
    hasNextPage: false,
  }
});

const forwardPagination = (args: IPaginationArgs) => ({
  limit: args.first,
  key: args.after ? cursorToKey(args.after) : undefined,
  operator: '>',
  order: 'ASC',
});

const backwardPagination = (args: IPaginationArgs) => ({
  limit: args.last,
  key: args.before ? cursorToKey(args.before) : undefined,
  operator: '<',
  order: 'DESC',
});

export const paginationArgs = validateArgs((args: IPaginationArgs) => (
  args.first
    ? forwardPagination(args)
    : backwardPagination(args)
));

const getEdges = <T extends TEntity>(items: T[]): IEdge<T>[] => {
  return items.map((item) => ({
    cursor: keyToCursor(item.id),
    node: item,
  }));
};

export const getCursorConnection = <T extends TEntity>(config: ICursorConnectionConfig<T>) => {
  const { items, pageInfo } = config;

  if (items.length === 0) return emptyCursorConnection<T>();

  const edges = getEdges<T>(items);
  const cursorConnection: ICursorConnection<T> = { pageInfo, edges };

  return cursorConnection;
};
