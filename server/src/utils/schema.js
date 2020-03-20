import {
  GraphQLID,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLNonNull,
} from 'graphql';

export const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
});

export const paginationArgs = () => ({
  first: { type: GraphQLInt },
  last: { type: GraphQLInt },
  skip: { type: GraphQLInt }
});

export const idType = () => ({
  type: new GraphQLNonNull(GraphQLID),
  resolve: obj => obj._id.toString(),
});
