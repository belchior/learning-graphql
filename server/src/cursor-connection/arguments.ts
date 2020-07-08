import { GraphQLError } from 'graphql';

import { TPaginationArgs, TForwardPaginationArgs, TBackwardPaginationArgs } from '../utils/interfaces';

type TPaginationArgsMixed = Partial<TForwardPaginationArgs & TBackwardPaginationArgs>

function testPaginationBoundaries(args: TPaginationArgsMixed) {
  if (
    typeof args != 'object' ||
    (args.first == undefined && args.last == undefined)
  ) {
    throw new GraphQLError('Missing pagination boundaries');
  }
}
function testLimit(args: TPaginationArgsMixed) {
  if (args.first != undefined && args.last != undefined) throw new GraphQLError(
    'first and last must not be specified at the same time'
  );
  const limit = args.first || args.last;
  if (typeof limit !== 'number' || limit <= 0 || Number.isSafeInteger(limit) === false) throw new GraphQLError(
    'first and last must be a positive integer'
  );
}
function testReference(args: TPaginationArgsMixed) {
  if (args.before != undefined && args.after != undefined) throw new GraphQLError(
    'before and after must not be specified at the same time'
  );
}
function testArgumentConsistency(args: TPaginationArgsMixed) {
  if (args.first != undefined && args.before != undefined) throw new GraphQLError(
    'first must be used with after but receive before instead'
  );
  if (args.last != undefined && args.after != undefined) throw new GraphQLError(
    'last must be used with before but receive after instead'
  );
  const cursor = args.before || args.after;
  if (cursor != undefined && (typeof cursor !== 'string' || cursor === '')) throw new GraphQLError(
    'before and after must be non empty string'
  );
}

export function validateArgs(args: TPaginationArgs) {
  testPaginationBoundaries(args);
  testLimit(args);
  testReference(args);
  testArgumentConsistency(args);
  return args;
}
