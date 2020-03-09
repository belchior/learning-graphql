import { GraphQLObjectType, GraphQLSchema, } from 'graphql';

import * as user from './entities/user/schema';
import * as repository from './entities/repository/schema';


export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...user.queryFields,
    ...repository.queryFields,
  }),
});

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...user.mutationFields,
    ...repository.mutationFields,
  }),
});

export const schema = new GraphQLSchema({ query, mutation });
