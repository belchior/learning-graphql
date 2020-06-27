import { GraphQLObjectType, GraphQLSchema, } from 'graphql';

import { queryFields } from './queries';


export const query: GraphQLObjectType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...queryFields,
  }),
});

export const schema = new GraphQLSchema({ query });
