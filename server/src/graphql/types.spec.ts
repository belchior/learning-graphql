import { GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLString, graphql, GraphQLError } from 'graphql';

import { OrganizationType, UserType, RepositoryOwnerInterface, ProfileOwnerInterface } from './types';
import { organizationData, userData, } from '../utils/mockData';


describe('ProfileOwnerInterface', () => {
  const schema = new GraphQLSchema({
    types: [UserType, OrganizationType],
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        profileOwner: {
          type: ProfileOwnerInterface,
          args: { login: { type: new GraphQLNonNull(GraphQLString) } },
          resolve: async (parent, args) => {
            switch (args.login) {
              case 'johndoe': return userData;
              case 'acme': return organizationData;
              default: return { __typename: 'unknown' };
            }
          },
        }
      }),
    })
  });

  it('should be able to resolve to UserType', async () => {
    const query = `
      {
        profileOwner(login: "johndoe") {
          login
        }
      }
    `;
    const expectedData = { data: {
      profileOwner: {
        login: userData.login,
      }
    } };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });

  it('should be able to resolve to OrganizationType', async () => {
    const query = `
      {
        profileOwner(login: "acme") {
          login
        }
      }
    `;
    const expectedData = { data: {
      profileOwner: {
        login: organizationData.login,
      }
    } };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });

  it('should throw un error when the data received has a unknown data structure', async () => {
    const query = `
      {
        profileOwner(login: "unknown") {
          login
        }
      }
    `;

    const error = new GraphQLError('Invalid typename: unknown');
    const expectedData = { data: { profileOwner: null }, errors: [error] };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });
});

describe('RepositoryOwnerInterface', () => {
  const schema = new GraphQLSchema({
    types: [UserType, OrganizationType],
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        repositoryOwner: {
          type: RepositoryOwnerInterface,
          args: { login: { type: new GraphQLNonNull(GraphQLString) } },
          resolve: async (parent, args) => {
            switch (args.login) {
              case 'johndoe': return userData;
              case 'acme': return organizationData;
              default: return { __typename: 'unknown' };
            }
          },
        }
      }),
    })
  });

  it('should be able to resolve to UserType', async () => {
    const query = `
      {
        repositoryOwner(login: "johndoe") {
          login
        }
      }
    `;
    const expectedData = { data: {
      repositoryOwner: {
        login: userData.login,
      }
    } };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });

  it('should be able to resolve to OrganizationType', async () => {
    const query = `
      {
        repositoryOwner(login: "acme") {
          login
        }
      }
    `;
    const expectedData = { data: {
      repositoryOwner: {
        login: organizationData.login,
      }
    } };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });

  it('should throw un error when the data received has a unknown data structure', async () => {
    const query = `
      {
        repositoryOwner(login: "unknown") {
          login
        }
      }
    `;

    const error = new GraphQLError('Invalid typename: unknown');
    const expectedData = { data: { repositoryOwner: null }, errors: [error] };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });
});
