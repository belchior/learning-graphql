import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from 'graphql';

// eslint-disable-next-line no-unused-vars
import { UserType } from '../user/schema';
import { mutationFields } from './schema';
import { Repository as RepositoryModel } from './model';

jest.mock('./model');


const repo = {
  description: 'repo description',
  forkCount: 2,
  licenseInfo: {
    name: 'MIT License'
  },
  name: 'Repo Name',
  ownerLogin: 'userLogin',
  primaryLanguage: {
    name: 'JavaScript',
    color: '#f1e05a',
  },
  url: 'https://github.com/userLogin/repo-name',
};


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
      ...mutationFields,
    }),
  }),
});


describe('Repository Schema', () => {
  describe('createRepository', () => {
    it('should receive input argument representing RepositoryInput', async () => {
      RepositoryModel.mockImplementationOnce(arg => {
        const promise = Promise.resolve(arg);
        promise.save = function(){return this;};
        return promise;
      });

      const query = `
        mutation m($repo: RepositoryInput!) {
          createRepository(input: $repo) {
            name
          }
        }
      `;

      const variableValues = { repo };
      const expectedData = { data: { createRepository: { name: repo.name } } };
      const receivedData = await graphql(schema, query, undefined, undefined, variableValues);
      expect(receivedData).toEqual(expectedData);
    });
  });
});
