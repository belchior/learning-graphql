import {
  GraphQLID,
  GraphQLInt,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import * as resolve from './resolve';


const Language = new GraphQLObjectType({
  name: 'Language',
  fields: () => ({
    color: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});
const LanguageInput = new GraphQLInputObjectType({
  name: 'LanguageInput',
  fields: () => ({
    color: { type: GraphQLString },
    name: { type: GraphQLString },
  }),
});

const License = new GraphQLObjectType({
  name: 'License',
  fields: () => ({
    name: { type: GraphQLString },
  }),
});
const LicenseInput = new GraphQLInputObjectType({
  name: 'LicenseInput',
  fields: () => ({
    name: { type: GraphQLString },
  }),
});

const Owner = new GraphQLObjectType({
  name: 'Owner',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
    login: { type: GraphQLString },
    url: { type: GraphQLString },
  }),
});

export const Repository = new GraphQLObjectType({
  name: 'Repository',
  fields: () => ({
    description: { type: GraphQLString },
    forkCount: { type: GraphQLInt },
    id: { type: new GraphQLNonNull(GraphQLID) },
    licenseInfo: { type: License },
    name: { type: new GraphQLNonNull(GraphQLString) },
    owner: {
      type: new GraphQLNonNull(Owner),
      resolve: resolve.Repository.owner,
    },
    primaryLanguage: { type: Language },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
export const RepositoryInput = new GraphQLInputObjectType({
  name: 'RepositoryInput',
  fields: () => ({
    description: { type: GraphQLString },
    forkCount: { type: GraphQLInt },
    licenseInfo: { type: LicenseInput },
    name: { type: GraphQLString },
    ownerLogin: { type: GraphQLString },
    primaryLanguage: { type: LanguageInput },
    url: { type: GraphQLString },
  }),
});


export const queryFields = {};

export const mutationFields = {
  createRepository: {
    type: Repository,
    args: {
      input: { type: new GraphQLNonNull(RepositoryInput) }
    },
    resolve: resolve.Mutation.createRepository
  }
};
