import {
  GraphQLID,
  GraphQLInt,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import * as organizationResolve from '../entities/organization/resolve';
import * as repositoryResolve from '../entities/repository/resolve';
import * as userResolve from '../entities/user/resolve';
import { TUser, TOrganization } from '../utils/interfaces';
import { connectionType, connectionTypeArgs } from '../cursor-connection/types';


export const idType = () => ({
  type: new GraphQLNonNull(GraphQLID),
});

const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

const LanguageType = new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    color: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const LicenseType = new GraphQLObjectType({
  name: 'License',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

export const RepositoryOwnerInterface: GraphQLInterfaceType = new GraphQLInterfaceType({
  name: 'RepositoryOwner',
  fields: () => ({
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
    id: idType(),
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    repositories: {
      type: RepositoryConnectionType,
      args: connectionTypeArgs(),
    },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
  resolveType: value => {
    switch (value.__typename) {
      case 'User': return UserType;
      case 'Organization': return OrganizationType;
      default: throw new Error(`Invalid typename: ${value.__typename}`);
    }
  },
});

export const RepositoryType = new GraphQLObjectType({
  interfaces: [NodeInterface],
  name: 'Repository',
  fields: () => ({
    description: { type: GraphQLString },
    forkCount: {
      type: GraphQLInt,
      resolve: repositoryResolve.Repository.forkCount,
    },
    id: idType(),
    licenseInfo: {
      type: LicenseType,
      resolve: repositoryResolve.Repository.licenseInfo,
    },
    name: { type: new GraphQLNonNull(GraphQLString) },
    owner: {
      type: new GraphQLNonNull(RepositoryOwnerInterface),
      resolve: repositoryResolve.Repository.owner,
    },
    primaryLanguage: {
      type: LanguageType,
      resolve: repositoryResolve.Repository.primaryLanguage,
    },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RepositoryConnectionType = connectionType(RepositoryType);

export const ProfileOwnerInterface = new GraphQLInterfaceType({
  name: 'ProfileOwner',
  fields: () => ({
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
    id: idType(),
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
  resolveType: value => {
    switch (value.__typename) {
      case 'User': return UserType;
      case 'Organization': return OrganizationType;
      default: throw new Error(`Invalid typename: ${value.__typename}`);
    }
  },
});

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  interfaces: [NodeInterface, ProfileOwnerInterface, RepositoryOwnerInterface],
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
    repositories: {
      type: RepositoryConnectionType,
      args: connectionTypeArgs(),
      resolve: userResolve.User.repositories,
    },
    starredRepositories: {
      type: RepositoryConnectionType,
      args: connectionTypeArgs(),
      resolve: userResolve.User.starredRepositories,
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
  interfaces: [NodeInterface, ProfileOwnerInterface, RepositoryOwnerInterface],
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
    repositories: {
      type: RepositoryConnectionType,
      args: connectionTypeArgs(),
      resolve: organizationResolve.Organization.repositories,
    },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: {
      type: GraphQLString,
      resolve: (parent: TOrganization) => parent.website_url,
    },
  }),
});

const OrganizationConnectionType = connectionType(OrganizationType);
