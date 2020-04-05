import {
  GraphQLError,
  GraphQLObjectType,
  GraphQLSchema,
  graphql,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

// eslint-disable-next-line no-unused-vars
import { UserType } from '../user/schema';
import { Organization as OrganizationModel } from '../organization/model';
import { User as UserModel } from '../user/model';
import { queryFields as ownerQueryFields, RepositoryOwnerInterface } from './schema';
import { queryFields as organizationQueryFields } from '../organization/schema';
import { queryFields as userQueryFields } from '../user/schema';

jest.mock('../organization/model');
jest.mock('../user/model');

const organizationData = {
  __typename: 'Organization',
  avatarUrl: 'http://acme.com/avatar.jpg',
  id: '5e61c002081d28c0fd5c348e',
  login: 'acme',
  name: 'ACME Corporation',
  url: 'https://github.com/acme',
};
const userData = {
  __typename: 'User',
  avatarUrl: 'http://johndoe.com/avatar.jpg',
  id: '5e5580d6f72291487ec648ce',
  login: 'johndoe',
  name: 'John Doe',
  url: 'https://github.com/johndoe',
};


describe('Owner Schema', () => {
  describe('profile query', () => {
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
          ...ownerQueryFields,
          ...organizationQueryFields,
          ...userQueryFields,
        }),
      }),
    });

    it('should return an organization type', async () => {
      OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));
      UserModel.find.mockImplementationOnce(() => Promise.resolve([]));

      const query = `
        query Profile {
          profile(login: "acme") {
            login
            __typename
          }
        }
      `;
      const expectedData = { data: {
        profile: {
          login: organizationData.login,
          __typename: organizationData.__typename,
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return an user type', async () => {
      OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([]));
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));

      const query = `
        query Profile {
          profile(login: "johndoe") {
            login
            __typename
          }
        }
      `;
      const expectedData = { data: {
        profile: {
          login: userData.login,
          __typename: userData.__typename,
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the login argument was not provided', async () => {
      const query = `
        query Profile {
          profile {
            login
            __typename
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

  describe('RepositoryOwnerInterface interface', () => {
    const schema = new GraphQLSchema({
      query: new GraphQLObjectType({
        name: 'Query',
        fields: () => ({
          ...organizationQueryFields,
          ...userQueryFields,
          repo: {
            type: RepositoryOwnerInterface,
            args: { login: { type: new GraphQLNonNull(GraphQLString) } },
            resolve: async (parent, args) => {
              return args.login === userData.login
                ? userData
                : organizationData;
            },
          }
        }),
      }),
    });

    it('should return an organization type', async () => {
      const query = `
        query Profile {
          repo(login: "acme") {
            login
            __typename
          }
        }
      `;
      const expectedData = { data: {
        repo: {
          login: organizationData.login,
          __typename: organizationData.__typename,
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return an user type', async () => {
      const query = `
        query Profile {
          repo(login: "johndoe") {
            login
            __typename
          }
        }
      `;
      const expectedData = { data: {
        repo: {
          login: userData.login,
          __typename: userData.__typename,
        }
      } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });
  });
});
