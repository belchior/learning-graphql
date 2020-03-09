import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from 'graphql';

import * as repositorySchema from './schema';
import { Repository as RepositoryModel } from './model';

jest.mock('./model');


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      _empty: {
        type: GraphQLString,
        resolve: () => ''
      }
    }),
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...repositorySchema.mutationFields,
    }),
  }),
});


describe('Repository Schema', () => {
  describe('createRepository', () => {
    it('should receive input argument representing RepositoryInput', async () => {
      const query = `
        mutation m($repo: RepositoryInput!) {
          createRepository(input: $repo) {
            name
          }
        }
      `;
      const repo = {
        description: 'repo description',
        forkCount: 2,
        licenseInfo: {
          name: 'MIT License'
        },
        name: 'repo-name',
        ownerLogin: 'userLogin',
        primaryLanguage: {
          name: 'JavaScript',
          color: '#f1e05a',
        },
        url: 'https://github.com/userLogin/repo-name',
      };
      RepositoryModel.mockImplementationOnce(arg => {
        const promise = Promise.resolve(arg);
        promise.save = function () { return this; };
        return promise;
      });

      const variableValues = { repo };
      const expectedData = { data: { createRepository: { name: repo.name } } };
      const receivedData = await graphql(schema, query, undefined, undefined, variableValues);
      expect(receivedData).toEqual(expectedData);
    });
  });
});