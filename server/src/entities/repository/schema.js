import {
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInterfaceType,
} from 'graphql';

import * as resolve from './resolve';
import { idType, NodeInterface } from '../../utils/schema';


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

export const RepositoryOwnerInterface = new GraphQLInterfaceType({
  name: 'RepositoryOwner',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
    id: idType(),
    login: { type: GraphQLString },
    url: { type: GraphQLString },
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
      resolve: resolve.Repository.owner,
    },
    primaryLanguage: { type: LanguageType },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

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


export const queryFields = {};

export const mutationFields = {
  createRepository: {
    type: RepositoryType,
    args: {
      input: { type: new GraphQLNonNull(RepositoryInputType) }
    },
    resolve: resolve.Mutation.createRepository
  }
};
