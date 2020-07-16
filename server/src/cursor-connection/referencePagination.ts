import {
  TBackwardPaginationArgs,
  TEdge,
  TEntity,
  TForwardPaginationArgs,
  TPageInfo,
  TPageInfoFnQueryArgs,
  TPageInfoItem,
  TPaginationArgs,
  TPaginationQueryArgs,
  TPrevOrNext,
} from '../utils/interfaces';
import { base64ToString, stringToBase64 } from '../utils/converter';
import { validateArgs } from './arguments';


type TReferenceFrom<T> = (item: T) => string

type TItemsToCursorConnectionArgs<T> = {
 referenceFrom: TReferenceFrom<T>
 items: T[]
 pageInfoItems: TPageInfoItem[]
}

type TPageInfoFnQuery = (args: TPageInfoFnQueryArgs) => string

export type TFindPageInfoArgs<T> = {
  items: T[]
  pageInfoFnQuery: TPageInfoFnQuery
  referenceFrom: TReferenceFrom<T>
}
export type TCursorConnection<T> = {
  edges: TEdge<T>[],
  pageInfo: TPageInfo
}



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
  const { items, pageInfoFnQuery, referenceFrom } = args;

  const firstItem = items[0];
  const lastItem = items[items.length -1];

  const prevQuery = pageInfoFnQuery({
    reference: referenceFrom(firstItem),
    operator: '<',
    order: 'DESC',
    row: 'prev',
  });
  const nextQuery = pageInfoFnQuery({
    reference: referenceFrom(lastItem),
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

function itemsToPageInfo <T>(args: TItemsToCursorConnectionArgs<T>) {
  const { referenceFrom, items, pageInfoItems } = args;

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
    endCursor: referenceToCursor(referenceFrom(lastItem)),
    hasNextPage: hasItem('next', pageInfoItems),
    hasPreviousPage: hasItem('prev', pageInfoItems),
    startCursor: referenceToCursor(referenceFrom(firstItem)),
  };

  return pageInfo;
}

function itemsToEdges <T>(items: T[], referenceFrom: TReferenceFrom<T>) {
  const edges: TEdge<T>[] = items.map(item => ({
    cursor: referenceToCursor(referenceFrom(item)),
    node: item,
  }));

  return edges;
}

export function itemsToCursorConnection <T>(args: TItemsToCursorConnectionArgs<T>) {
  const { referenceFrom, items } = args;
  const edges = itemsToEdges<T>(items, referenceFrom);
  const pageInfo = itemsToPageInfo<T>(args);
  const cursorConnection: TCursorConnection<T> = { edges, pageInfo };
  return cursorConnection;
}
