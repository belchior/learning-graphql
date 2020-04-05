import { GraphQLObjectType, GraphQLSchema, } from 'graphql';

import {
  queryFields as userQueryFields,
  mutationFields as userMutationFields,
} from './entities/user/schema';
import { queryFields as organizationQueryFields, } from './entities/organization/schema';
import { queryFields as ownerQueryFields, } from './entities/owner/schema';
import { mutationFields as repositoryMutationFields, } from './entities/repository/schema';


export const query = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    ...organizationQueryFields,
    ...ownerQueryFields,
    ...userQueryFields,
  }),
});

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...repositoryMutationFields,
    ...userMutationFields,
  }),
});

export const schema = new GraphQLSchema({ query, mutation });
