import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,

} from 'graphql';

import * as resolve from './resolve';
import { NodeType, paginationArgs } from '../../utils/schema';
import { OrganizationType } from '../organization/schema';
import { RepositoryType } from '../repository/schema';
import { connectionType, connectionTypeArgs } from '../../cursor-connection/schema';


const UserType = new GraphQLObjectType({
  interfaces: [NodeType],
  name: 'User',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
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
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: parent => parent._id.toString(),
    },
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    organizations: {
      type: connectionType(OrganizationType),
      args: connectionTypeArgs(),
      resolve: resolve.User.organizations,
    },
    repositories: {
      type: connectionType(RepositoryType),
      args: connectionTypeArgs(),
      resolve: resolve.User.repositories,
    },
    starredRepositories: {
      type: new GraphQLNonNull(new GraphQLList(RepositoryType)),
      args: paginationArgs(),
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
