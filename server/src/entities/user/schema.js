import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import * as resolve from './resolve';
import { Organization as OrganizationType } from '../organization/schema';
import { Repository as RepositoryType } from '../repository/schema';
import { paginationArgs } from '../../utils/schema';


const User = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
    bio: { type: GraphQLString },
    company: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    followers: {
      type: new GraphQLNonNull(new GraphQLList(User)),
      args: paginationArgs(),
      resolve: resolve.User.followers,
    },
    id: { type: new GraphQLNonNull(GraphQLID) },
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    organizations: {
      type: new GraphQLNonNull(new GraphQLList(OrganizationType)),
      args: paginationArgs(),
      resolve: resolve.User.organizations,
    },
    repositories: {
      type: new GraphQLNonNull(new GraphQLList(RepositoryType)),
      args: paginationArgs(),
      resolve: resolve.User.repositories,
    },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: GraphQLString },
  }),
});

const UserInput = new GraphQLInputObjectType({
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
const FollowerInput = new GraphQLInputObjectType({
  name: 'FollowerInput',
  fields: () => ({
    id: { type: GraphQLID },
    login: { type: GraphQLString },
  }),
});


export const queryFields = {
  user: {
    type: User,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: resolve.Query.user
  }
};

export const mutationFields = {
  addUserFollower: {
    type: User,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(FollowerInput) },
    },
    resolve: resolve.Mutation.addUserFollower,
  },
  createUser: {
    type: User,
    args: {
      input: { type: new GraphQLNonNull(UserInput) }
    },
    resolve: resolve.Mutation.createUser,
  },
  removeUserFollower: {
    type: User,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: resolve.Mutation.removeUserFollower,
  },
  updateUserName: {
    type: User,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: resolve.Mutation.updateUserName,
  },
};
