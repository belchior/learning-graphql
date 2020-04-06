import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import {
  FollowerInputType,
  RepositoryInputType,
  RepositoryType,
  UserInputType,
  UserType,
} from './types';
import * as repositoryResolve from '../entities/repository/resolve';
import * as userResolve from '../entities/user/resolve';


export const mutationFields = {
  addUserFollower: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(FollowerInputType) },
    },
    resolve: userResolve.Mutation.addUserFollower,
  },

  createRepository: {
    type: RepositoryType,
    args: {
      input: { type: new GraphQLNonNull(RepositoryInputType) }
    },
    resolve: repositoryResolve.Mutation.createRepository
  },

  createUser: {
    type: UserType,
    args: {
      input: { type: new GraphQLNonNull(UserInputType) }
    },
    resolve: userResolve.Mutation.createUser,
  },

  removeUserFollower: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: userResolve.Mutation.removeUserFollower,
  },

  updateUserName: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      input: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: userResolve.Mutation.updateUserName,
  },
};
