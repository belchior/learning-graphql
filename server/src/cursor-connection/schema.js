import {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
} from 'graphql';


export const PageInfoType = new GraphQLObjectType({
  name: 'PageInfo',
  fields: () => ({
    hasPreviousPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
  }),
});

export const connectionType = Type => {
  const EdgeType = new GraphQLObjectType({
    name: `${Type.name}Edge`,
    fields: () => ({
      cursor: { type: new GraphQLNonNull(GraphQLString) },
      node: { type: Type },
    }),
  });
  const ConnectionType = new GraphQLObjectType({
    name: `${Type.name}Connection`,
    fields: () => ({
      edges: { type: new GraphQLNonNull(new GraphQLList(EdgeType)) },
      pageInfo: { type: new GraphQLNonNull(PageInfoType) },
    }),
  });
  return new GraphQLNonNull(ConnectionType);
};

export const connectionTypeArgs = () => ({
  after: { type: GraphQLString },
  before: { type: GraphQLString },
  first: { type: GraphQLInt },
  last: { type: GraphQLInt },
});
