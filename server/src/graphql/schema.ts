import { GraphQLObjectType, GraphQLSchema, } from 'graphql';

import { queryFields } from './queries';
import { mutationFields } from './mutations';


export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...queryFields,
  }),
});

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...mutationFields,
  }),
});

export const schema = new GraphQLSchema({ query, mutation });
