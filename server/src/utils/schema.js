import {
  GraphQLInt,
} from 'graphql';

export const paginationArgs = () => ({
  first: { type: GraphQLInt },
  last: { type: GraphQLInt },
  skip: { type: GraphQLInt }
});