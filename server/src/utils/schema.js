import {
  GraphQLID,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLNonNull,
} from 'graphql';

export const NodeType = new GraphQLInterfaceType({
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
