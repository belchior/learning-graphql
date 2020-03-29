import { GraphQLError, GraphQLObjectType, GraphQLSchema, graphql, } from 'graphql';

// eslint-disable-next-line no-unused-vars
import { UserType } from '../user/schema';
import { Organization as OrganizationModel } from './model';
import { queryFields } from './schema';

jest.mock('./model');

const organizationData = {
  id: '5e61c002081d28c0fd5c348e',
  login: 'acme',
  avatarUrl: 'http://acme.com/avatar.jpg',
  email: 'contact@acme.com',
  location: 'world',
  name: 'ACME Corporation',
  url: 'https://github.com/acme',
  websiteUrl: 'http://acme.com',
};

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
  });
});
