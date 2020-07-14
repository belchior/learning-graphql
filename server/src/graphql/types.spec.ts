import { graphql, GraphQLError } from 'graphql';

import { createLoaders } from './loaders';
import { find } from '../db';
import { schema } from './schema';
import { userData, organizationData } from '../utils/mockData';

jest.mock('../db');


describe('ProfileOwnerInterface', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should resolve to UserType when login match to User', async () => {
    (find as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }));

    const query = `
      {
        profile(login: "johndoe") {
          login
          ... on User {
            bio
          }
        }
      }
    `;
    const expectedData = {
      data: {
        profile: {
          login: userData.login,
          bio: userData.bio,
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(2);
  });

  it('should resolve to OrganizationType when login match to Organization', async () => {
    (find as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }));

    const query = `
      {
        profile(login: "acme") {
          login
          ... on Organization {
            description
          }
        }
      }
    `;
    const expectedData = {
      data: {
        profile: {
          login: organizationData.login,
          description: organizationData.description,
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(2);
  });

  it('should return an error when the resolved type is not a UserType or OrganizationType', async () => {
    const wrongUserData = {
      ...userData,
      login: 'wronguser',
      __typename: 'WrongUser'
    };
    (find as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ rows: [wrongUserData] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }));

    const query = `
      {
        profile(login: "wronguser") {
          login
          ... on User {
            bio
          }
        }
      }
    `;
    const error = new GraphQLError('Invalid typename: WrongUser');
    const expectedData = { data: { profile: null }, errors: [ error ] };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(2);
  });
});

describe('UserType', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should return the flattened part of the data', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));

    const query = `
      {
        user(login: "johndoe") {
          __typename
          avatarUrl
          bio
          company
          email
          id
          location
          login
          name
          url
          websiteUrl
        }
      }
    `;
    const expectedData = {
      data: {
        user: {
          __typename: userData.__typename,
          avatarUrl: userData.avatar_url,
          bio: userData.bio,
          company: userData.company,
          email: userData.email,
          id: userData.id,
          location: userData.location,
          login: userData.login,
          name: userData.name,
          url: userData.url,
          websiteUrl: userData.website_url,
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(1);
  });

  it('should return a "not found" error when no user match with the provided login', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));

    const query = `
      {
        user(login: "noone") {
          login
        }
      }
    `;
    const error = new GraphQLError('User not found with login: noone');
    const context = { loader: createLoaders() };
    const expectedData = { data: { user: null }, errors: [ error ] };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(1);
  });

  describe('field followers', () => {
    it('should return a list of followers in a cursor connection structure', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: userData.followers }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            name
            followers(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            name: userData.name,
            followers: {
              edges: [
                { node: { name: userData.followers[0].name } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(3);
    });

    it('should return empty connection when no follower is found', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            login
            followers(first: 1) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            login: userData.login,
            followers: {
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
              },
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(2);
    });

    it('should return an error when the pagination arguments was not provided', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));

      const query = `
        {
          user(login: "johndoe") {
            followers {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const error = new GraphQLError('Missing pagination boundaries');
      const expectedData = { data: { user: null }, errors: [ error ] };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(1);
    });
  });

  describe('field following', () => {
    it('should return a list of followers in a cursor connection structure', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: userData.following }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            name
            following(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            name: userData.name,
            following: {
              edges: [
                { node: { name: userData.following[0].name } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(3);
    });

    it('should return empty connection when no following is found', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            login
            following(first: 1) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            login: userData.login,
            following: {
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
              },
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(2);
    });

    it('should return an error when the pagination arguments was not provided', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));

      const query = `
        {
          user(login: "johndoe") {
            following {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const error = new GraphQLError('Missing pagination boundaries');
      const expectedData = { data: { user: null }, errors: [ error ] };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(1);
    });
  });

  describe('field organizations', () => {
    it('should return a list of organization in a cursor connection structure', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: userData.organizations }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            name
            organizations(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            name: userData.name,
            organizations: {
              edges: [
                { node: { name: userData.organizations[0].name } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(3);
    });

    it('should return empty connection when no organization is found', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            login
            organizations(first: 1) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            login: userData.login,
            organizations: {
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
              },
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(2);
    });

    it('should return an error when the pagination arguments was not provided', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));

      const query = `
        {
          user(login: "johndoe") {
            organizations {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const error = new GraphQLError('Missing pagination boundaries');
      const expectedData = { data: { user: null }, errors: [ error ] };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(1);
    });
  });
});


describe('OrganizationType', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should return the flattened part of the data', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }));

    const query = `
      {
        organization(login: "acme") {
          __typename
          avatarUrl
          description
          email
          id
          location
          login
          name
          url
          websiteUrl
        }
      }
    `;
    const expectedData = {
      data: {
        organization: {
          __typename: organizationData.__typename,
          avatarUrl: organizationData.avatar_url,
          description: organizationData.description,
          email: organizationData.email,
          id: organizationData.id,
          location: organizationData.location,
          login: organizationData.login,
          name: organizationData.name,
          url: organizationData.url,
          websiteUrl: organizationData.website_url,
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(1);
  });

  it('should return a "not found" error when no user match with the provided login', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }));

    const query = `
      {
        organization(login: "noone") {
          login
        }
      }
    `;
    const error = new GraphQLError('Organization not found with login: noone');
    const context = { loader: createLoaders() };
    const expectedData = { data: { organization: null }, errors: [ error ] };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(1);
  });

  describe('field followers', () => {
    it('should return a list of followers in a cursor connection structure', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: organizationData.people }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          organization(login: "acme") {
            name
            people(first: 1) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          organization: {
            name: organizationData.name,
            people: {
              edges: [
                { node: { name: organizationData.people[0].name } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(3);
    });

    it('should return empty connection when no follower is found', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          organization(login: "acme") {
            login
            people(first: 1) {
              pageInfo {
                hasNextPage
                hasPreviousPage
              }
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          organization: {
            login: organizationData.login,
            people: {
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
              },
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(2);
    });

    it('should return an error when the pagination arguments was not provided', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }));

      const query = `
        {
          organization(login: "acme") {
            people {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      `;
      const error = new GraphQLError('Missing pagination boundaries');
      const expectedData = { data: { organization: null }, errors: [ error ] };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(1);
    });
  });
});
