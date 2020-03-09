import { GraphQLError } from 'graphql';

export const maxNumberOfItems = 50;
export const minNumberOfItemsToSkip = 0;

const validateArgs = args => {
  if (args.first == null && args.last == null) {
    throw new GraphQLError('Missing pagination boundaries');
  }
  if (args.first != null && args.last != null) {
    throw new GraphQLError('first and last must not be specified at the same time');
  }
  if (Number.isInteger(args.skip) && args.skip < minNumberOfItemsToSkip) {
    throw new GraphQLError('skip must be a positive interger');
  }
  const limit = args.first || args.last;
  if (Number.isInteger(limit) === false || limit <= 0) {
    throw new GraphQLError('first and last must be a positive integer');
  }
};

export const paginationBoundaries = (args = {}) => {
  validateArgs(args);

  let skip = args.skip || minNumberOfItemsToSkip;
  let limit = Math.min(args.first, maxNumberOfItems);
  let sort = { _id: 1 };

  if (args.last) {
    limit = Math.min(args.last, maxNumberOfItems);
    sort = { _id: -1 };
  }

  return { skip, limit, sort };
};

export const paginationArrays = (args = {}) => {
  validateArgs(args);

  let limit = Math.min(args.first, maxNumberOfItems);
  let skip = Number.isInteger(args.skip) && args.skip > minNumberOfItemsToSkip
    ? args.skip
    : minNumberOfItemsToSkip;

  if (args.last) {
    limit = Math.min(args.last, maxNumberOfItems);
    skip = -limit - skip;
  }
  return { skip, limit };
};