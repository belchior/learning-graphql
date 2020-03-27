
import { base64ToString, stringToBase64 } from '../utils/converter';
import { validateArgs } from './arguments';


/*
  forward pagination argument
  first = 3
  after = 2
  returned = [02, 03, 04]

            2             3
            |`````````````|
  |----|----|----|----|----|----|----|----|----|----
  | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09
  |----|----|----|----|----|----|----|----|----|----
                           |,,,,,,,,,,,,,|
                          -5             3

  backward pagination argument
  last   = 3
  before = 2 (-last - before = -5)
  returned = [05, 06, 07]
*/


const emptyCursorConnection = {
  edges: [],
  pageInfo: {
    hasPreviousPage: false,
    hasNextPage: false,
  }
};
const cursorToKey = base64ToString;
const keyToCursor = stringToBase64;

export const parseKey = key => {
  const result = key.match(/^(?<after>-?\d+)\|(?<before>-?\d+)$/);
  if (!result) throw new Error(`Unable to parse key: ${key}`);
  const { groups: { after, before } } = result;
  return { after: Number(after), before: Number(before) };
};

const forwardPagination = args => {
  const limit = args.first;
  let skip;
  if (args.after) {
    const keys = parseKey(cursorToKey(args.after));
    skip = Math.max(0, (keys.after + 1));
  } else {
    skip = 0;
  }
  return { skip, limit };
};

const backwardPagination = args => {
  const limit = args.last;
  let skip;
  if (args.before) {
    const keys = parseKey(cursorToKey(args.before));
    skip = keys.before - limit;
  } else {
    skip = -limit;
  }
  return { skip, limit };
};


export const arrayIndexPagination = validateArgs(args => {
  return args.first
    ? forwardPagination(args)
    : backwardPagination(args);
});


const forwardPageInfo = items => {
  let keys;
  const firstItem = items[0];
  const lastItem = items[items.length -1];
  const totalItems = firstItem.totalItems;

  keys = parseKey(firstItem.key);
  const hasPreviousPage = keys.after > 0;

  keys = parseKey(lastItem.key);
  const hasNextPage = keys.after < totalItems -1;

  return { hasNextPage, hasPreviousPage };
};

const backwardPageInfo = items => {
  let keys;
  const firstItem = items[0];
  const lastItem = items[items.length -1];
  const totalItems = firstItem.totalItems;

  if (items.length === totalItems) {
    return { hasNextPage: false, hasPreviousPage: false };
  }

  keys = parseKey(lastItem.key);
  const hasPreviousPage = keys.before === totalItems -1;

  keys = parseKey(firstItem.key);
  const hasNextPage = keys.before + totalItems === 0;

  return { hasNextPage, hasPreviousPage };
};

const getPageInfo = (items, args) => {
  return args.first ? forwardPageInfo(items) : backwardPageInfo(items);
};

export const valuesToCursorConnection = (values, args) => {
  if (Array.isArray(values) === false || values.length === 0) return emptyCursorConnection;

  const pageInfo = getPageInfo(values, args);
  const cursorConnection = {
    edges: values.map(value => ({
      cursor: keyToCursor(value.key),
      node: value,
    })),
    pageInfo,
  };

  return cursorConnection;
};