import { GraphQLError, GraphQLObjectType, GraphQLSchema, graphql, } from 'graphql';

// eslint-disable-next-line no-unused-vars
import { UserType } from '../user/schema';
import { Organization as OrganizationModel } from './model';
import { Repository as RepositoryModel } from '../repository/model';
import { queryFields } from './schema';

jest.mock('./model');
jest.mock('../repository/model');

const organizationData = {
  id: '5e61c002081d28c0fd5c3489',
  login: 'acme',
  avatarUrl: 'http://acme.com/avatar.jpg',
  email: 'contact@acme.com',
  location: 'world',
  name: 'ACME Corporation',
  people: [{ _id: '5e5580d6f72291487ec648ce', login: 'johndoe' }],
  repositories: [{ _id: '5e74ce7ff3bb02311c781c0b', name: 'Repo name' }],
  url: 'https://github.com/acme',
  websiteUrl: 'http://acme.com',
};
const pageInfo = { hasPreviousPage: false, hasNextPage: false };


OrganizationModel.find.mockImplementation(() => Promise.resolve([organizationData]));

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...queryFields,
    }),
  }),
});


describe('Organization Schema', () => {
  describe('organization query', () => {
    it('should execute successfully', async () => {
      const query = `
        query Organization {
          organization(login: "acme") {
            name
          }
        }
      `;
      const expectedData = { data: { organization: { name: organizationData.name } } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the login argument was not provided', async () => {
      const query = `
        query Organization {
            organization {
              name
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

    describe('people field', () => {
      it('should execute successfully', async () => {
        OrganizationModel.aggregate
          .mockImplementationOnce(() => Promise.resolve(organizationData.people))
          .mockImplementationOnce(() => Promise.resolve([pageInfo]));

        const query = `
          query Organization {
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
        const expectedData = { data: { organization: {
          login: organizationData.login,
          people: {
            edges: [
              { node: { login: organizationData.people[0].login } }
            ]
          },
        } } };
        const receivedData = await graphql(schema, query);

        expect(receivedData).toEqual(expectedData);
      });

      it('should return empty connection when organization has no one', async () => {
        OrganizationModel.aggregate
          .mockImplementationOnce(() => Promise.resolve([]))
          .mockImplementationOnce(() => Promise.resolve([pageInfo]));

        const query = `
          query Organization {
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
        const expectedData = { data: { organization: {
          login: organizationData.login,
          people: {
            edges: []
          },
        } } };
        const receivedData = await graphql(schema, query);

        expect(receivedData).toEqual(expectedData);
      });

      it('should return error when the pagination arguments was not provided', async () => {
        const query = `
          query Organization {
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
        // eslint-disable-next-line no-null/no-null
        const expectedData = { data: { organization: null }, errors: [ error ] };
        const receivedData = await graphql(schema, query);
        expect(receivedData).toEqual(expectedData);
      });
    });

    describe('repositories field', () => {
      it('should execute successfully', async () => {
        RepositoryModel.aggregate
          .mockImplementationOnce(() => Promise.resolve(organizationData.repositories))
          .mockImplementationOnce(() => Promise.resolve([pageInfo]));

        const query = `
          query Organization {
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
        const expectedData = { data: { organization: {
          login: organizationData.login,
          repositories: {
            edges: [
              { node: { name: organizationData.repositories[0].name } }
            ]
          },
        } } };
        const receivedData = await graphql(schema, query);

        expect(receivedData).toEqual(expectedData);
      });

      it('should return empty connection when there is no repository', async () => {
        RepositoryModel.aggregate
          .mockImplementationOnce(() => Promise.resolve([]))
          .mockImplementationOnce(() => Promise.resolve([pageInfo]));

        const query = `
          query Organization {
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
        const expectedData = { data: { organization: {
          login: organizationData.login,
          repositories: {
            edges: []
          },
        } } };
        const receivedData = await graphql(schema, query);

        expect(receivedData).toEqual(expectedData);
      });

      it('should return error when the pagination arguments was not provided', async () => {
        const query = `
          query Organization {
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
        // eslint-disable-next-line no-null/no-null
        const expectedData = { data: { organization: null }, errors: [ error ] };
        const receivedData = await graphql(schema, query);
        expect(receivedData).toEqual(expectedData);
      });
    });
  });
});
