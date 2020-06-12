import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLInterfaceType,
} from 'graphql';

import * as organizationResolve from '../entities/organization/resolve';
import * as repositoryResolve from '../entities/repository/resolve';
import * as userResolve from '../entities/user/resolve';
import { connectionType, connectionTypeArgs } from '../cursor-connection/types';


export const idType = () => ({
  type: new GraphQLNonNull(GraphQLID),
  resolve: (obj) => obj._id.toString(),
});

const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

export const ProfileOwnerInterface = new GraphQLInterfaceType({
  interfaces: [NodeInterface],
  name: 'ProfileOwner',
  fields: () => ({
    id: idType(),
    login: { type: new GraphQLNonNull(GraphQLString) },
  }),
  resolveType: value => {
    switch (value.__typename) {
      case 'User': return UserType;
      case 'Organization': return OrganizationType;
      default: throw new Error(`Invalid typename: ${value.__typename}`);
    }
  },
});

export const RepositoryOwnerInterface = new GraphQLInterfaceType({
  interfaces: [NodeInterface],
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

export const UserType = new GraphQLObjectType({
  interfaces: [NodeInterface, ProfileOwnerInterface, RepositoryOwnerInterface],
  name: 'User',
  fields: () => ({
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
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
    websiteUrl: { type: GraphQLString },
  }),
});

const UserConnectionType = connectionType(UserType);

export const UserInputType = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
    bio: { type: GraphQLString },
    company: { type: GraphQLString },
    email: { type: GraphQLString },
    location: { type: GraphQLString },
    login: { type: GraphQLString },
    name: { type: GraphQLString },
    url: { type: GraphQLString },
    websiteUrl: { type: GraphQLString },
  }),
});

export const FollowerInputType = new GraphQLInputObjectType({
  name: 'FollowerInput',
  fields: () => ({
    id: { type: GraphQLID },
    login: { type: GraphQLString },
  }),
});

const LanguageType = new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    color: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const LanguageInputType = new GraphQLInputObjectType({
  name: 'LanguageInput',
  fields: () => ({
    color: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const LicenseType = new GraphQLObjectType({
  name: 'License',
  fields: () => ({
    name: { type: GraphQLString },
  }),
});

const LicenseInputType = new GraphQLInputObjectType({
  name: 'LicenseInput',
  fields: () => ({
    name: { type: GraphQLString },
  }),
});

export const RepositoryType = new GraphQLObjectType({
  interfaces: [NodeInterface],
  name: 'Repository',
  fields: () => ({
    description: { type: GraphQLString },
    forkCount: { type: GraphQLInt },
    id: idType(),
    licenseInfo: { type: LicenseType },
    name: { type: new GraphQLNonNull(GraphQLString) },
    owner: {
      type: new GraphQLNonNull(RepositoryOwnerInterface),
      resolve: repositoryResolve.Repository.owner,
    },
    primaryLanguage: { type: LanguageType },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const RepositoryConnectionType = connectionType(RepositoryType);

export const RepositoryInputType = new GraphQLInputObjectType({
  name: 'RepositoryInput',
  fields: () => ({
    description: { type: GraphQLString },
    forkCount: { type: GraphQLInt },
    licenseInfo: { type: LicenseInputType },
    name: { type: GraphQLString },
    ownerLogin: { type: GraphQLString },
    primaryLanguage: { type: LanguageInputType },
    url: { type: GraphQLString },
  }),
});

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
      resolve: organizationResolve.Organization.people,
    },
    repositories: {
      type: RepositoryConnectionType,
      args: connectionTypeArgs(),
      resolve: organizationResolve.Organization.repositories,
    },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: GraphQLString },
  }),
});

const OrganizationConnectionType = connectionType(OrganizationType);
