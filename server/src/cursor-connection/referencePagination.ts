import {
  TEdge,
  TPaginationArgs,
  TCursorConnection,
  TEntity,
  TFindPageInfoArgs,
  TPageInfo,
  TPageInfoItem,
  TPaginationQueryArgs,
  TPrevOrNext,
  TForwardPaginationArgs,
  TBackwardPaginationArgs,
} from '../utils/interfaces';
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


const cursorToReference = (cursor: string) => {
  const reference = base64ToString(cursor);
  return reference.replace(/[']/g, "''"); // eslint-disable-line
};
const referenceToCursor = stringToBase64;

const forwardPagination = (args: TForwardPaginationArgs): TPaginationQueryArgs => ({
  limit: args.first,
  reference: args.after ? cursorToReference(args.after) : undefined,
  operator: '>',
  order: 'ASC',
});

const backwardPagination = (args: TBackwardPaginationArgs): TPaginationQueryArgs => ({
  limit: args.last,
  reference: args.before ? cursorToReference(args.before) : undefined,
  operator: '<',
  order: 'DESC',
});

export function paginationArgsToQueryArgs (args: TPaginationArgs)  {
  validateArgs(args);
  return args.first
    ? forwardPagination(args)
    : backwardPagination(args);
}

export function emptyCursorConnection <T>() {
  const emptyConnection: TCursorConnection<T> = {
    edges: [],
    pageInfo: {
      hasPreviousPage: false,
      hasNextPage: false,
    }
  };

  return emptyConnection;
}

export function itemsToPageInfoQuery <T extends TEntity>(args: TFindPageInfoArgs<T>) {
  const { items, pageInfoFnQuery } = args;

  const firstItem = items[0];
  const lastItem = items[items.length -1];

  const prevQuery = pageInfoFnQuery({
    reference: String(firstItem.id),
    operator: '<',
    order: 'DESC',
    row: 'prev',
  });
  const nextQuery = pageInfoFnQuery({
    reference: String(lastItem.id),
    operator: '>',
    order: 'ASC',
    row: 'next',
  });

  return `
    SELECT * FROM (${prevQuery}) as prev
    UNION
    SELECT * FROM (${nextQuery}) as next
  `;
}

function itemsToPageInfo <T extends TEntity>(items: T[], pageInfoItems: TPageInfoItem[]) {
  if (items.length === 0) {
    const pageInfo: TPageInfo = {
      hasNextPage: false,
      hasPreviousPage: false,
    };
    return pageInfo;
  }

  const hasItem = (name: TPrevOrNext, items: TPageInfoItem[]) => items.reduce(
    (acc, item) => (acc === true || item.row === name),
    false
  );

  const firstItem = items[0];
  const lastItem = items[items.length -1];

  const pageInfo: TPageInfo = {
    endCursor: referenceToCursor(String(lastItem.id)),
    hasNextPage: hasItem('next', pageInfoItems),
    hasPreviousPage: hasItem('prev', pageInfoItems),
    startCursor: referenceToCursor(String(firstItem.id)),
  };

  return pageInfo;
}

function itemsToEdges <T extends TEntity>(items: T[]) {
  const edges: TEdge<T>[] = items.map(item => ({
    cursor: referenceToCursor(String(item.id)),
    node: item,
  }));

  return edges;
}

export function itemsToCursorConnection <T extends TEntity>(items: T[], pageInfoItems: TPageInfoItem[]) {
  const edges = itemsToEdges<T>(items);
  const pageInfo = itemsToPageInfo<T>(items, pageInfoItems);
  const cursorConnection: TCursorConnection<T> = { edges, pageInfo };
  return cursorConnection;
}
