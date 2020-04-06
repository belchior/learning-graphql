import {
  GraphQLError,
  GraphQLObjectType,
  GraphQLSchema,
  graphql,
} from 'graphql';

import { Repository as RepositoryModel } from '../entities/repository/model';
import { Organization as OrganizationModel } from '../entities/organization/model';
import { User as UserModel } from '../entities/user/model';
import { queryFields } from './queries';
import { pageInfo, organizationData, userData } from '../utils/mockData';

jest.mock('../entities/user/model');
jest.mock('../entities/organization/model');
jest.mock('../entities/repository/model');


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...queryFields,
    }),
  }),
});

describe('Query organization', () => {
  beforeEach(() => {
    (OrganizationModel.aggregate as jest.Mock).mockReset();
    (RepositoryModel.aggregate as jest.Mock).mockReset();
    (UserModel.aggregate as jest.Mock).mockReset();
  });

  it('should execute successfully', async () => {
    (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));
    const query = `
      {
        organization(login: "acme") {
          id
        }
      }
    `;
    const expectedData = { data: {
      organization: {
        id: organizationData.id
      }
    } };
    const receivedData = await graphql(schema, query);

    expect(receivedData).toEqual(expectedData);
  });

  it('should return error when the login argument was not provided', async () => {
    (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));
    const query = `
      {
        organization {
          id
        }
      }
    `;
    const error = new GraphQLError(
      'Field "organization" argument "login" of type "String!" is required, but it was not provided.'
    );
    const expectedData = { errors: [ error ] };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });

  describe('field people', () => {
    it('should execute successfully', async () => {
      (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));
      (OrganizationModel.aggregate as jest.Mock)
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
      const expectedData = { data: {
        organization: {
          login: organizationData.login,
          people: {
            edges: [
              { node: { login: organizationData.people[0].login } }
            ]
          },
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return empty connection when organization has no user', async () => {
      (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));
      (OrganizationModel.aggregate as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve([]))
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
      const expectedData = { data: {
        organization: {
          login: organizationData.login,
          people: {
            edges: []
          },
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));
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
      const receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });
  });

  describe('field repositories', () => {
    it('should execute successfully', async () => {
      (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));
      (RepositoryModel.aggregate as jest.Mock)
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
      const expectedData = { data: {
        organization: {
          login: organizationData.login,
          repositories: {
            edges: [
              { node: { name: organizationData.repositories[0].name } }
            ]
          },
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return empty connection when there is no repository', async () => {
      (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));
      (RepositoryModel.aggregate as jest.Mock)
        .mockImplementationOnce(() => Promise.resolve([]))
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
      const expectedData = { data: {
        organization: {
          login: organizationData.login,
          repositories: {
            edges: []
          },
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));
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
      const receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });
  });
});

describe('Query profile', () => {
  beforeEach(() => {
    (OrganizationModel.aggregate as jest.Mock).mockReset();
    (UserModel.aggregate as jest.Mock).mockReset();
  });

  it('should resolve to UserType when login match a User', async () => {
    (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([]));
    (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));

    const query = `
      {
        profile(login: "johndoe") {
          id
          __typename
        }
      }
    `;
    const expectedData = { data: {
      profile: {
        id: userData.id,
        __typename: userData.__typename
      }
    } };
    const receivedData = await graphql(schema, query);

    expect(receivedData).toEqual(expectedData);
  });

  it('should resolve to OrganizationType when login match a Organization', async () => {
    (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));
    (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([]));

    const query = `
      {
        profile(login: "acme") {
          id
          __typename
        }
      }
    `;
    const expectedData = { data: {
      profile: {
        id: organizationData.id,
        __typename: organizationData.__typename
      }
    } };
    const receivedData = await graphql(schema, query);

    expect(receivedData).toEqual(expectedData);
  });

  it('should return error when the login argument was not provided', async () => {
    const query = `
      {
        profile {
          id
        }
      }
    `;
    const error = new GraphQLError(
      'Field "profile" argument "login" of type "String!" is required, but it was not provided.'
    );
    const expectedData = { errors: [ error ] };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });
});

describe('Query user', () => {
  beforeEach(() => {
    (UserModel.aggregate as jest.Mock).mockReset();
    (RepositoryModel.aggregate as jest.Mock).mockReset();
  });

  it('should execute successfully', async () => {
    (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));
    const query = `
      {
        user(login: "johndoe") {
          id
        }
      }
    `;
    const expectedData = { data: { user: { id: userData.id } } };
    const receivedData = await graphql(schema, query);

    expect(receivedData).toEqual(expectedData);
  });

  it('should return error when the login argument was not provided', async () => {
    (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));
    const query = `
      {
        user {
          login
        }
      }
    `;
    const error = new GraphQLError(
      'Field "user" argument "login" of type "String!" is required, but it was not provided.'
    );
    const expectedData = { errors: [ error ] };
    const receivedData = await graphql(schema, query);
    expect(receivedData).toEqual(expectedData);
  });

  describe('field followers', () => {
    it('should execute successfully', async () => {
      (UserModel.aggregate as jest.Mock)
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
      const expectedData = { data: {
        user: {
          name: userData.name,
          followers: {
            edges: [
              { node: { name: userData.followers[0].name } }
            ]
          },
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));
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
      const receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });
  });

  describe('field following', () => {
    it('should execute successfully', async () => {
      (UserModel.aggregate as jest.Mock)
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
      const expectedData = { data: { user: {
        name: userData.name,
        following: {
          edges:[
            { node: { name: userData.following[0].name } }
          ]
        },
      } } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));
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
      const receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });
  });

  describe('field organizations', () => {
    it('should execute successfully', async () => {
      (UserModel.aggregate as jest.Mock)
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
      const expectedData = { data: { user: {
        name: userData.name,
        organizations: {
          edges: [
            { node: { name: userData.organizations[0].name } }
          ]
        },
      } } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));
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
      const receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });
  });

  describe('field repositories', () => {
    it('should execute successfully', async () => {
      (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));
      (RepositoryModel.aggregate as jest.Mock)
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
      const expectedData = { data: {
        user: {
          name: userData.name,
          repositories: {
            edges: [
              { node: { name: userData.repositories[0].name } }
            ]
          },
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));
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
      const receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });
  });

  describe('field starredRepositories', () => {
    it('should execute successfully', async () => {
      (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));
      (UserModel.aggregate as jest.Mock)
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
      const expectedData = { data: {
        user: {
          name: userData.name,
          starredRepositories: {
            edges: [
              { node: { name: userData.starredRepositories[0].name } }
            ]
          },
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));
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
      const receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });
  });
});
