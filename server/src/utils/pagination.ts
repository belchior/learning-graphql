import { GraphQLError } from 'graphql';

type TContext = {
  [keyName: string]: string | number | boolean
}
interface IPaginationArgs extends TContext {
  first?: number
  last?: number
  skip?: number
}

export const maxNumberOfItems = 50;
export const minNumberOfItemsToSkip = 0;

const validateArgs = (args: IPaginationArgs) => {
  if (args.first == undefined && args.last == undefined) {
    throw new GraphQLError('Missing pagination boundaries');
  }
  if (args.first != undefined && args.last != undefined) {
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

export const paginationBoundaries = (args: IPaginationArgs) => {
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

export const paginationArrays = (args: IPaginationArgs) => {
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
