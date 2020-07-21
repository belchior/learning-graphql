import { graphql, GraphQLError } from 'graphql';

import { createLoaders } from './loaders';
import { find } from '../db';
import { schema } from './schema';
import { userData, organizationData, ownerDataUser, ownerDataOrganization } from '../utils/mockData';


jest.mock('../db');


describe('RepositoryType', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should return the flattened part of the data', async () => {
    (find as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: userData.repositories }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

    const query = `
      {
        user(login: "johndoe") {
          repositories(first: 1) {
            edges {
              node {
                description
                forkCount
                id
                name
                url
                __typename
              }
            }
          }
        }
      }
    `;
    const expectedData = {
      data: {
        user: {
          repositories: {
            edges: [{
              node: {
                __typename: userData.repositories[0].__typename,
                description: userData.repositories[0].description,
                forkCount: userData.repositories[0].fork_count,
                id: String(userData.repositories[0].id),
                name: userData.repositories[0].name,
                url: userData.repositories[0].url,
              }
            }]
          }
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(3);
  });

  describe('field licenseInfo', () => {
    it('should resolve to un object with a attribute "name" contaning the name of license', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: userData.repositories }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            repositories(first: 1) {
              edges {
                node {
                  licenseInfo {
                    name
                  }
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            repositories: {
              edges: [{
                node: {
                  licenseInfo: {
                    name: userData.repositories[0].license_name
                  }
                }
              }]
            }
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(3);
    });

    it('should resolve to null when the repository has no license defined', async () => {
      const repositories = [{
        ...userData.repositories[0],
        license_name: undefined
      }];
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: repositories }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            repositories(first: 1) {
              edges {
                node {
                  licenseInfo {
                    name
                  }
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            repositories: {
              edges: [{
                node: {
                  licenseInfo: null
                }
              }]
            }
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(3);
    });
  });

  describe('field owner', () => {
    it('should resolve to RepositoryOwner', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: userData.repositories }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));

      const query = `
        {
          user(login: "johndoe") {
            repositories(first: 1) {
              edges {
                node {
                  owner {
                    avatarUrl
                    id
                    login
                    name
                    url
                  }
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            repositories: {
              edges: [{
                node: {
                  owner: {
                    avatarUrl: userData.avatar_url,
                    id: String(userData.id),
                    login: userData.login,
                    name: userData.name,
                    url: userData.url,
                  }
                }
              }]
            }
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(4);
    });
  });

  describe('field primaryLanguage', () => {
    it('should resolve to un object that contains a color and a name', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: userData.repositories }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            repositories(first: 1) {
              edges {
                node {
                  primaryLanguage {
                    color
                    name
                  }
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            repositories: {
              edges: [{
                node: {
                  primaryLanguage: {
                    color: userData.repositories[0].language_color,
                    name: userData.repositories[0].language_name
                  }
                }
              }]
            }
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(3);
    });

    it('should resolve to null when the repository has no primaryLanguage defined', async () => {
      const repositories = [{
        ...userData.repositories[0],
        language_name: undefined
      }];
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: repositories }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            repositories(first: 1) {
              edges {
                node {
                  primaryLanguage {
                    name
                  }
                }
              }
            }
          }
        }
      `;
      const expectedData = {
        data: {
          user: {
            repositories: {
              edges: [{
                node: {
                  primaryLanguage: null
                }
              }]
            }
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(find).toHaveBeenCalledTimes(3);
    });
  });
});


describe('RepositoryOwnerInterface', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should resolve to UserType when login match to User', async () => {
    (find as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: userData.repositories }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [ownerDataUser] }));

    const query = `
      {
        user(login: "johndoe") {
          repositories(first: 1) {
            edges {
              node {
                owner {
                  avatarUrl
                  id
                  login
                  name
                  url
                }
              }
            }
          }
        }
      }
    `;
    const expectedData = {
      data: {
        user: {
          repositories: {
            edges: [{
              node: {
                owner: {
                  avatarUrl: ownerDataUser.avatar_url,
                  id: String(ownerDataUser.id),
                  login: ownerDataUser.login,
                  name: ownerDataUser.name,
                  url: ownerDataUser.url,
                }
              }
            }]
          }
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(4);
  });

  it('should resolve to OrganizationType when login match to Organization', async () => {
    (find as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: organizationData.repositories }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [ownerDataOrganization] }));

    const query = `
      {
        organization(login: "acme") {
          repositories(first: 1) {
            edges {
              node {
                owner {
                  avatarUrl
                  id
                  login
                  name
                  url
                }
              }
            }
          }
        }
      }
    `;
    const expectedData = {
      data: {
        organization: {
          repositories: {
            edges: [{
              node: {
                owner: {
                  avatarUrl: ownerDataOrganization.avatar_url,
                  id: String(ownerDataOrganization.id),
                  login: ownerDataOrganization.login,
                  name: ownerDataOrganization.name,
                  url: ownerDataOrganization.url,
                }
              }
            }]
          }
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(4);
  });

  it('should return an error when the resolved type is not a UserType or OrganizationType', async () => {
    const wrongUserData = {
      ...userData,
      __typename: 'WrongUser'
    };
    (find as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: userData.repositories }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [wrongUserData] }));

    const query = `
      {
        user(login: "johndoe") {
          repositories(first: 1) {
            edges {
              node {
                owner {
                  avatarUrl
                  id
                  login
                  name
                  url
                }
              }
            }
          }
        }
      }
    `;
    const error = new GraphQLError('Invalid typename: WrongUser');
    const expectedData = {
      data: {
        user: {
          repositories: {
            edges: [{
              node: null
            }]
          }
        }
      },
      errors: [ error ],
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(4);
  });
});


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

  it('should return a "not found" error when no profile match with the provided login', async () => {
    (find as jest.Mock)
      .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
      .mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }));

    const query = `
      {
        profile(login: "noone") {
          login
        }
      }
    `;
    const error = new GraphQLError('Profile not found with login: noone');
    const context = { loader: createLoaders() };
    const expectedData = { data: { profile: null }, errors: [ error ] };
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
          id: String(userData.id),
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

  describe('field repositories', () => {
    it('should return a list of repositories in a cursor connection structure', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: userData.repositories }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            name
            repositories(first: 1) {
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
            repositories: {
              edges: [
                { node: { name: userData.repositories[0].name } }
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

    it('should return empty connection when no repository is found', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            login
            repositories(first: 1) {
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
            repositories: {
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
            repositories {
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

  describe('field starredRepositories', () => {
    it('should return a list of repositories in a cursor connection structure', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: userData.starredRepositories }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            name
            starredRepositories(first: 1) {
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
            starredRepositories: {
              edges: [
                { node: { name: userData.starredRepositories[0].name } }
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

    it('should return empty connection when no repository is found', async () => {
      (find as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve({ rows: [userData] }))
        .mockImplementationOnce(() => Promise.resolve({ rows: [] }));

      const query = `
        {
          user(login: "johndoe") {
            login
            starredRepositories(first: 1) {
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
            starredRepositories: {
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
            starredRepositories {
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
          id: String(organizationData.id),
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
