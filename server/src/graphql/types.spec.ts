import { GraphQLObjectType, GraphQLSchema, GraphQLNonNull, GraphQLString, graphql } from 'graphql';

import { OrganizationType, UserType, RepositoryOwnerInterface } from './types';
import { organizationData, userData, } from '../utils/mockData';


describe('RepositoryOwnerInterface', () => {
  const schema = new GraphQLSchema({
    types: [UserType, OrganizationType],
    query: new GraphQLObjectType({
      name: 'Query',
      fields: () => ({
        owner: {
          type: RepositoryOwnerInterface,
          args: { login: { type: new GraphQLNonNull(GraphQLString) } },
          resolve: async (parent, args) => {
            switch (args.login) {
              case 'johndoe': return userData;
              case 'acme': return organizationData;
              default: throw new Error();
            }
          },
        }
      }),
    })
  });

  it('should be able to resolve to UserType', async () => {
    const query = `
      {
        owner(login: "johndoe") {
          login
        }
      }
    `;
    const expectedData = { data: {
      owner: {
        login: userData.login,
      }
    } };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });

  it('should be able to resolve to OrganizationType', async () => {
    const query = `
      {
        owner(login: "acme") {
          login
        }
      }
    `;
    const expectedData = { data: {
      owner: {
        login: organizationData.login,
      }
    } };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });
});
