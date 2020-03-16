import {
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import * as resolve from './resolve';


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

const OwnerType = new GraphQLObjectType({
  name: 'Owner',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
    login: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

export const RepositoryType = new GraphQLObjectType({
  name: 'Repository',
  fields: () => ({
    description: { type: GraphQLString },
    forkCount: { type: GraphQLInt },
    id: { type: new GraphQLNonNull(GraphQLID) },
    licenseInfo: { type: LicenseType },
    name: { type: new GraphQLNonNull(GraphQLString) },
    owner: {
      type: new GraphQLNonNull(OwnerType),
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
