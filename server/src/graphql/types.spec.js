import { GraphQLError, graphql } from 'graphql';

import { Organization as OrganizationModel } from '../entities/organization/model';
import { Repository as RepositoryModel } from '../entities/repository/model';
import { User as UserModel } from '../entities/user/model';
import { createLoaders } from '../entities/loaders';
import {
  organizationData,
  ownerDataOrganization,
  ownerDataUser,
  pageInfo,
  repositoryDataOrganization,
  userData,
} from '../utils/mockData';
import { schema } from './schema';


jest.mock('../entities/organization/model');
jest.mock('../entities/repository/model');
jest.mock('../entities/user/model');


describe('Organization type', () => {
  describe('field people', () => {
    beforeEach(() => {
      OrganizationModel.find.mockReset();
      OrganizationModel.aggregate.mockReset();
    });

    it('should execute successfully', async () => {
      OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));
      OrganizationModel.aggregate
        .mockImplementationOnce(() => Promise.resolve(organizationData.people))
        .mockImplementationOnce(() => Promise.resolve([pageInfo]));

      const query = `
        {
          organization(login: "acme") {
            login
            people(first: 1) {
              edges {
                node {
                  login
                }
              }
            }
          }
        }
      `;
      const login = organizationData.people[0].login;
      const expectedData = {
        data: {
          organization: {
            login: organizationData.login,
            people: {
              edges: [
                { node: { login } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
      expect(OrganizationModel.aggregate).toHaveBeenCalledTimes(2);
    });

    it('should return empty connection when organization has no user', async () => {
      OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));
      OrganizationModel.aggregate.mockImplementationOnce(() => Promise.resolve([]));

      const query = `
        {
          organization(login: "acme") {
            login
            people(first: 1) {
              edges {
                node {
                  login
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
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
      expect(OrganizationModel.aggregate).toHaveBeenCalledTimes(1);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));
      const query = `
        {
          organization(login: "acme") {
            login
            people {
              edges {
                node {
                  login
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
      expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('field repositories', () => {
    beforeEach(() => {
      OrganizationModel.find.mockReset();
      OrganizationModel.aggregate.mockReset();
      RepositoryModel.aggregate.mockReset();
    });

    it('should execute successfully', async () => {
      OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));
      RepositoryModel.aggregate
        .mockImplementationOnce(() => Promise.resolve(organizationData.repositories))
        .mockImplementationOnce(() => Promise.resolve([pageInfo]));

      const query = `
        {
          organization(login: "acme") {
            login
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
      const name = organizationData.repositories[0].name;
      const expectedData = {
        data: {
          organization: {
            login: organizationData.login,
            repositories: {
              edges: [
                { node: { name } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
      expect(RepositoryModel.aggregate).toHaveBeenCalledTimes(2);
    });

    it('should return empty connection when there is no repository', async () => {
      OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));
      RepositoryModel.aggregate.mockImplementationOnce(() => Promise.resolve([]));

      const query = `
        {
          organization(login: "acme") {
            login
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
          organization: {
            login: organizationData.login,
            repositories: {
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
      expect(RepositoryModel.aggregate).toHaveBeenCalledTimes(1);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));
      const query = `
        {
          organization(login: "acme") {
            login
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
      const expectedData = { data: { organization: null }, errors: [ error ] };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Repository type', () => {
  beforeEach(() => {
    OrganizationModel.find.mockReset();
    RepositoryModel.aggregate.mockReset();
    UserModel.find.mockReset();
  });

  it('field id should return string type', async () => {
    UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
    RepositoryModel.aggregate
      .mockImplementationOnce(() => Promise.resolve(userData.repositories))
      .mockImplementationOnce(() => Promise.resolve([pageInfo]));

    const query = `
      {
        user(login: "johndoe") {
          name
          repositories(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `;
    const id = userData.repositories[0]._id.toString();
    const expectedData = {
      data: {
        user: {
          name: userData.name,
          repositories: {
            edges: [
              { node: { id } }
            ]
          },
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
    expect(RepositoryModel.aggregate).toHaveBeenCalledTimes(2);
  });

  it('field owner should be able to resolve to a Organization', async () => {
    UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
    OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([ownerDataOrganization]));
    RepositoryModel.aggregate
      .mockImplementationOnce(() => Promise.resolve([repositoryDataOrganization]))
      .mockImplementationOnce(() => Promise.resolve([pageInfo]));

    const query = `
      {
        user(login: "johndoe") {
          name
          repositories(first: 1) {
            edges {
              node {
                owner {
                  login
                  __typename
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
          name: userData.name,
          repositories: {
            edges: [
              {
                node: {
                  owner: {
                    login: ownerDataOrganization.login,
                    __typename: ownerDataOrganization.__typename
                  }
                }
              }
            ]
          },
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
    expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
    expect(RepositoryModel.aggregate).toHaveBeenCalledTimes(2);
  });

  it('field owner should be able to resolve to a User', async () => {
    UserModel.find
      .mockImplementationOnce(() => Promise.resolve([userData]))
      .mockImplementationOnce(() => Promise.resolve([ownerDataUser]));
    RepositoryModel.aggregate
      .mockImplementationOnce(() => Promise.resolve(userData.repositories))
      .mockImplementationOnce(() => Promise.resolve([pageInfo]));

    const query = `
      {
        user(login: "johndoe") {
          name
          repositories(first: 1) {
            edges {
              node {
                owner {
                  login
                  __typename
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
          name: userData.name,
          repositories: {
            edges: [
              {
                node: {
                  owner: {
                    login: ownerDataUser.login,
                    __typename: ownerDataUser.__typename
                  }
                }
              }
            ]
          },
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(UserModel.find).toHaveBeenCalledTimes(2);
    expect(RepositoryModel.aggregate).toHaveBeenCalledTimes(2);
  });

  it('field owner should throw un error when the received data don\'t match known implementors', async () => {
    const unknownType = { name: 'unknown', __typename: 'unknown' };
    UserModel.find
      .mockImplementationOnce(() => Promise.resolve([userData]))
      .mockImplementationOnce(() => Promise.resolve([unknownType]));
    RepositoryModel.aggregate
      .mockImplementationOnce(() => Promise.resolve(userData.repositories))
      .mockImplementationOnce(() => Promise.resolve([pageInfo]));

    const query = `
      {
        user(login: "johndoe") {
          name
          repositories(first: 1) {
            edges {
              node {
                owner {
                  login
                  __typename
                }
              }
            }
          }
        }
      }
    `;
    const error = new GraphQLError('Invalid typename: unknown');
    const expectedData = {
      data: {
        user: {
          name: userData.name,
          repositories: {
            edges: [
              { node: null }
            ]
          },
        }
      },
      errors: [ error ]
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(UserModel.find).toHaveBeenCalledTimes(2);
    expect(RepositoryModel.aggregate).toHaveBeenCalledTimes(2);
  });
});

describe('User type', () => {
  describe('field followers', () => {
    beforeEach(() => {
      UserModel.find.mockReset();
      UserModel.aggregate.mockReset();
    });

    it('should execute successfully', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
      UserModel.aggregate
        .mockImplementationOnce(() => Promise.resolve(userData.followers))
        .mockImplementationOnce(() => Promise.resolve([pageInfo]));

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
      const name = userData.followers[0].name;
      const expectedData = {
        data: {
          user: {
            name: userData.name,
            followers: {
              edges: [
                { node: { name } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
      expect(UserModel.aggregate).toHaveBeenCalledTimes(2);
    });

    it('should return empty connection when there is no followers', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
      UserModel.aggregate.mockImplementationOnce(() => Promise.resolve([]));

      const query = `
        {
          user(login: "johndoe") {
            login
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
            login: userData.login,
            followers: {
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
      expect(UserModel.aggregate).toHaveBeenCalledTimes(1);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
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
      expect(UserModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('field following', () => {
    beforeEach(() => {
      UserModel.find.mockReset();
      UserModel.aggregate.mockReset();
    });

    it('should execute successfully', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
      UserModel.aggregate
        .mockImplementationOnce(() => Promise.resolve(userData.following))
        .mockImplementationOnce(() => Promise.resolve([pageInfo]));

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
      const name = userData.following[0].name;
      const expectedData = {
        data: {
          user: {
            name: userData.name,
            following: {
              edges:[
                { node: { name } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
      expect(UserModel.aggregate).toHaveBeenCalledTimes(2);
    });

    it('should return empty connection when there is no following', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
      UserModel.aggregate.mockImplementationOnce(() => Promise.resolve([]));

      const query = `
        {
          user(login: "johndoe") {
            login
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
            login: userData.login,
            following: {
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
      expect(UserModel.aggregate).toHaveBeenCalledTimes(1);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
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
      expect(UserModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('field organizations', () => {
    beforeEach(() => {
      UserModel.find.mockReset();
      UserModel.aggregate.mockReset();
    });

    it('should execute successfully', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
      UserModel.aggregate
        .mockImplementationOnce(() => Promise.resolve(userData.organizations))
        .mockImplementationOnce(() => Promise.resolve([pageInfo]));

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
      const name = userData.organizations[0].name;
      const expectedData = {
        data: {
          user: {
            name: userData.name,
            organizations: {
              edges: [
                { node: { name } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
      expect(UserModel.aggregate).toHaveBeenCalledTimes(2);
    });

    it('should return empty connection when there is no organization', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
      UserModel.aggregate.mockImplementationOnce(() => Promise.resolve([]));

      const query = `
        {
          user(login: "johndoe") {
            login
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
            login: userData.login,
            organizations: {
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
      expect(UserModel.aggregate).toHaveBeenCalledTimes(1);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
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
      expect(UserModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('field repositories', () => {
    beforeEach(() => {
      UserModel.find.mockReset();
      RepositoryModel.aggregate.mockReset();
    });

    it('should execute successfully', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
      RepositoryModel.aggregate
        .mockImplementationOnce(() => Promise.resolve(userData.repositories))
        .mockImplementationOnce(() => Promise.resolve([pageInfo]));

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
      const name = userData.repositories[0].name;
      const expectedData = {
        data: {
          user: {
            name: userData.name,
            repositories: {
              edges: [
                { node: { name } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
      expect(RepositoryModel.aggregate).toHaveBeenCalledTimes(2);
    });

    it('should return empty connection when there is no repository', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
      RepositoryModel.aggregate.mockImplementationOnce(() => Promise.resolve([]));

      const query = `
        {
          user(login: "johndoe") {
            login
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
            login: userData.login,
            repositories: {
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
      expect(RepositoryModel.aggregate).toHaveBeenCalledTimes(1);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
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
      expect(UserModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('field starredRepositories', () => {
    beforeEach(() => {
      UserModel.find.mockReset();
      UserModel.aggregate.mockReset();
    });

    it('should execute successfully', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
      UserModel.aggregate
        .mockImplementationOnce(() => Promise.resolve(userData.starredRepositories))
        .mockImplementationOnce(() => Promise.resolve([pageInfo]));

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
      const name = userData.starredRepositories[0].name;
      const expectedData = {
        data: {
          user: {
            name: userData.name,
            starredRepositories: {
              edges: [
                { node: { name } }
              ]
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
      expect(UserModel.aggregate).toHaveBeenCalledTimes(2);
    });

    it('should return empty connection when there is no repository', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
      UserModel.aggregate.mockImplementationOnce(() => Promise.resolve([]));

      const query = `
        {
          user(login: "johndoe") {
            login
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
            login: userData.login,
            starredRepositories: {
              edges: []
            },
          }
        }
      };
      const context = { loader: createLoaders() };
      const receivedData = await graphql(schema, query, undefined, context);

      expect(receivedData).toEqual(expectedData);
      expect(UserModel.find).toHaveBeenCalledTimes(1);
      expect(UserModel.aggregate).toHaveBeenCalledTimes(1);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
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
      expect(UserModel.find).toHaveBeenCalledTimes(1);
    });
  });
});
