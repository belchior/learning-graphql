import { graphql, GraphQLError } from 'graphql';

import { createLoaders } from '../entities/loaders';
import { find } from '../db';
import { schema } from './schema';
import { userData } from '../utils/mockData';

jest.mock('../db');


describe('UserType', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should return the flattened part of data', async () => {
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
          avatarUrl: userData.avatarUrl,
          bio: userData.bio,
          company: userData.company,
          email: userData.email,
          id: userData.id,
          location: userData.location,
          login: userData.login,
          name: userData.name,
          url: userData.url,
          websiteUrl: userData.websiteUrl,
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(1);
  });

  describe('field followers', () => {
    beforeEach(() => {
      (find as jest.Mock).mockReset();
    });

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

    it('should return error when the pagination arguments was not provided', async () => {
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
    beforeEach(() => {
      (find as jest.Mock).mockReset();
    });

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

    it('should return error when the pagination arguments was not provided', async () => {
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
});
