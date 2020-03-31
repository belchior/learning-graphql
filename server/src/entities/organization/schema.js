import { GraphQLNonNull, GraphQLObjectType, GraphQLString, } from 'graphql';

import * as resolve from './resolve';
import { ProfileOwnerInterface, RepositoryOwnerInterface } from '../owner/schema';
import { idType, NodeInterface } from '../../utils/schema';


export const OrganizationType = new GraphQLObjectType({
  interfaces: [NodeInterface, ProfileOwnerInterface, RepositoryOwnerInterface],
  name: 'Organization',
  fields: () => ({
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    email: { type: GraphQLString },
    id: idType(),
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: GraphQLString },
  }),
});

export const queryFields = {
  organization: {
    type: OrganizationType,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: resolve.Query.organization
  }
};
