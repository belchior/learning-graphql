import {
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import * as organizationResolve from '../entities/organization/resolve';
import * as userResolve from '../entities/user/resolve';
import { connectionType, connectionTypeArgs } from '../cursor-connection/types';
import { TUser, TOrganization } from '../utils/interfaces';


export const idType = () => ({
  type: new GraphQLNonNull(GraphQLID),
});

const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  interfaces: [NodeInterface],
  name: 'User',
  fields: () => ({
    avatarUrl: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent: TUser) => parent.avatar_url,
    },
    bio: { type: GraphQLString },
    company: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    followers: {
      type: UserConnectionType,
      args: connectionTypeArgs(),
      resolve: userResolve.User.followers,
    },
    following: {
      type: UserConnectionType,
      args: connectionTypeArgs(),
      resolve: userResolve.User.following,
    },
    id: idType(),
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    organizations: {
      type: OrganizationConnectionType,
      args: connectionTypeArgs(),
      resolve: userResolve.User.organizations,
    },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: {
      type: GraphQLString,
      resolve: (parent: TUser) => parent.website_url,
    },
  }),
});

const UserConnectionType = connectionType(UserType);

export const OrganizationType: GraphQLObjectType = new GraphQLObjectType({
  interfaces: [NodeInterface],
  name: 'Organization',
  fields: () => ({
    avatarUrl: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (parent: TOrganization) => parent.avatar_url,
    },
    description: { type: GraphQLString },
    email: { type: GraphQLString },
    id: idType(),
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    people: {
      type: UserConnectionType,
      args: connectionTypeArgs(),
      resolve: organizationResolve.Organization.people,
    },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: {
      type: GraphQLString,
      resolve: (parent: TOrganization) => parent.website_url,
    },
  }),
});

const OrganizationConnectionType = connectionType(OrganizationType);
