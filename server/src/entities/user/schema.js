import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import * as resolve from './resolve';
import { OrganizationType } from '../organization/schema';
import { RepositoryOwnerInterface } from '../owner/schema';
import { RepositoryType } from '../repository/schema';
import { connectionType, connectionTypeArgs } from '../../cursor-connection/schema';
import { idType, NodeInterface } from '../../utils/schema';


const RepositoryConnectionType = connectionType(RepositoryType);
const OrganizationConnectionType = connectionType(OrganizationType);

export const UserType = new GraphQLObjectType({
  interfaces: [NodeInterface, RepositoryOwnerInterface],
  name: 'User',
  fields: () => ({
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
    bio: { type: GraphQLString },
    company: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    followers: {
      type: UserConnectionType,
      args: connectionTypeArgs(),
      resolve: resolve.User.followers,
    },
    following: {
      type: UserConnectionType,
      args: connectionTypeArgs(),
      resolve: resolve.User.following,
    },
    id: idType(),
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    organizations: {
      type: OrganizationConnectionType,
      args: connectionTypeArgs(),
      resolve: resolve.User.organizations,
    },
    repositories: {
      type: RepositoryConnectionType,
      args: connectionTypeArgs(),
      resolve: resolve.User.repositories,
    },
    starredRepositories: {
      type: RepositoryConnectionType,
      args: connectionTypeArgs(),
      resolve: resolve.User.starredRepositories,
    },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: GraphQLString },
  }),
});

const UserConnectionType = connectionType(UserType);

const UserInputType = new GraphQLInputObjectType({
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

const FollowerInputType = new GraphQLInputObjectType({
  name: 'FollowerInput',
  fields: () => ({
    id: { type: GraphQLID },
    login: { type: GraphQLString },
  }),
});


export const queryFields = {
  user: {
    type: UserType,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: resolve.Query.user
  }
};

export const mutationFields = {
  addUserFollower: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(FollowerInputType) },
    },
    resolve: resolve.Mutation.addUserFollower,
  },
  createUser: {
    type: UserType,
    args: {
      input: { type: new GraphQLNonNull(UserInputType) }
    },
    resolve: resolve.Mutation.createUser,
  },
  removeUserFollower: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: resolve.Mutation.removeUserFollower,
  },
  updateUserName: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: resolve.Mutation.updateUserName,
  },
};
