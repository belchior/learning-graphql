import { GraphQLNonNull, GraphQLObjectType, GraphQLString, } from 'graphql';

import * as resolve from './resolve';
import { ProfileOwnerInterface, RepositoryOwnerInterface } from '../owner/schema';
import { idType, NodeInterface } from '../../utils/schema';
import { connectionTypeArgs, connectionType } from '../../cursor-connection/schema';
import { RepositoryConnectionType } from '../repository/schema';
import { UserConnectionType } from '../user/schema';


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
    people: {
      type: UserConnectionType,
      args: connectionTypeArgs(),
      resolve: resolve.Organization.people,
    },
    repositories: {
      type: RepositoryConnectionType,
      args: connectionTypeArgs(),
      resolve: resolve.Organization.repositories,
    },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: GraphQLString },
  }),
});

export const OrganizationConnectionType = connectionType(OrganizationType);

export const queryFields = {
  organization: {
    type: OrganizationType,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: resolve.Query.organization
  }
};
