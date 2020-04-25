
import * as organizationResolve from '../entities/organization/resolve';
import * as ownerResolve from '../entities/owner/resolve';
import * as repositoryResolve from '../entities/repository/resolve';
import * as userResolve from '../entities/user/resolve';
import { typeDefs as mutation } from './mutations';
import { typeDefs as query } from './queries';
import { typeDefs as types } from './types';


const interfaceResolve = {
  Node: {
    __resolveType: (obj: { __typename: string }) => obj.__typename
  },
  ProfileOwner: {
    __resolveType: (obj: { __typename: string }) => {
      const knownImplemetors = ['User', 'Organization'];
      if (knownImplemetors.includes(obj.__typename)) return obj.__typename;
      throw new Error(`Invalid typename: ${obj.__typename}`);
    },
  },
  RepositoryOwner: {
    __resolveType: (obj: { __typename: string }) => {
      const knownImplemetors = ['User', 'Organization'];
      if (knownImplemetors.includes(obj.__typename)) return obj.__typename;
      throw new Error(`Invalid typename: ${obj.__typename}`);
    },
  }
};

export const resolvers = {
  Query: {
    ...organizationResolve.Query,
    ...ownerResolve.Query,
    ...userResolve.Query,
  },
  Mutation: {
    ...repositoryResolve.Mutation,
    ...userResolve.Mutation,
  },
  ...interfaceResolve,
  Organization: organizationResolve.Organization,
  Repository: repositoryResolve.Repository,
  User: userResolve.User,
};

export const typeDefs = [query, mutation, types];
