import { GraphQLError } from 'graphql';

type TContext = {
  [keyName: string]: string | number | boolean
}
export interface IPaginationArgs extends TContext {
  first?: number
  last?: number
  skip?: number
}
export interface IOwnerArgs extends TContext {
  login: string
}
export interface IInputArgs {
  id: string
  input: TContext
}

export const validateArgs = (callback: Function) => (args: IPaginationArgs) => {
  if (
    typeof args != 'object' ||
    (args.first == undefined && args.last == undefined)
  ) {
    throw new GraphQLError('Missing pagination boundaries');
  }
  if (args.first != undefined && args.last != undefined) throw new GraphQLError(
    'first and last must not be specified at the same time'
  );
  if (args.before != undefined && args.after != undefined) throw new GraphQLError(
    'before and after must not be specified at the same time'
  );
  if (args.first != undefined && args.before != undefined) throw new GraphQLError(
    'first must be used with after but receive before instead'
  );
  if (args.last != undefined && args.after != undefined) throw new GraphQLError(
    'last must be used with before but receive after instead'
  );

  const limit = args.first || args.last;
  if (Number.isInteger(limit) === false || limit <= 0) throw new GraphQLError(
    'first and last must be a positive integer'
  );

  const cursor = args.before || args.after;
  if ( cursor != undefined && (typeof cursor !== 'string' || cursor === '')) throw new GraphQLError(
    'before and after must be non empty string'
  );

  return callback(args);
};
