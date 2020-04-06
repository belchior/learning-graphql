import {
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';


export const paginationArgs = () => ({
  first: { type: GraphQLInt },
  last: { type: GraphQLInt },
  skip: { type: GraphQLInt }
});

export const idType = () => ({
  type: new GraphQLNonNull(GraphQLID),
  resolve: obj => obj._id.toString(),
});
