import {
  GraphQLError,
  GraphQLObjectType,
  GraphQLSchema,
  graphql,
} from 'graphql';

import { User as UserModel } from './model';
import * as userSchema from './schema';

jest.mock('./model');


const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      ...userSchema.queryFields,
    }),
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...userSchema.mutationFields,
    }),
  }),
});

const userData = {
  avatarUrl: 'http://johndoe.com/avatar.jpg',
  bio: 'bio description',
  company: 'Company',
  email: 'johndoe@email.com',
  followers: [{ name: 'Richard Roe', }],
  id: '5e5580d6f72291487ec648ce',
  location: 'Brazil',
  login: 'johndoe',
  name: 'John Doe',
  repositories: [{ name: 'Repo name' }],
  url: 'https://github.com/johndoe',
  websiteUrl: 'http://johndoe.com',
};
UserModel.findOne.mockImplementation(() => Promise.resolve(userData));
UserModel.findOneAndUpdate.mockImplementation(() => Promise.resolve(userData));


describe('User Schema', () => {
  describe('user query', () => {
    it('should execute successfully', async () => {
      UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));

      const query = `
        query User {
          user(login: "johndoe") {
            name
          }
        }
      `;
      const expectedData = { data: { user: { name: userData.name } } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the login argument was not provided', async () => {
      const query = `
        query User {
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

    describe('organizations field', () => {
      it('should return error when the pagination arguments was not provided', async () => {
        const query = `
          query User {
            user(login: "johndoe") {
              organizations {
                name
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

    describe('repositories field', () => {
      it('should return error when the pagination arguments was not provided', async () => {
        const query = `
          query User {
            user(login: "johndoe") {
              repositories {
                name
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

  describe('addUserFollower', () => {
    it('argument id should be provided in a valid format', async () => {
      let query = `
        mutation {
          addUserFollower(
            input: { id: "5e5580d6f72291487ec648de", login: "loginName" }
          ) {
            name
          }
        }
      `;
      let error = new GraphQLError(
        'Field "addUserFollower" argument "id" of type "ID!" is required, but it was not provided.'
      );
      let expectedData = { errors: [ error ] };
      let receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);

      query = `
        mutation {
          addUserFollower(
            id: "invalid id"
            input: { id: "5e5580d6f72291487ec648de", login: "loginName" }
          ) {
            name
          }
        }
      `;
      error = new GraphQLError('Invalid args.: invalid id');
      expectedData = { data: { addUserFollower: null }, errors: [ error ] };
      receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);

      query = `
        mutation {
          addUserFollower(
            id: "5e5580d6f72291487ec648dc"
            input: { id: "5e5580d6f72291487ec648de", login: "loginName" }
          ) {
            name
          }
        }
      `;
      expectedData = { data: { addUserFollower: { name: userData.name } } };
      receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });

    it('should receive input argument representing FollowerInput', async () => {
      const query = `
        mutation {
          addUserFollower(
            id: "5e5580d6f72291487ec648dc"
            input: { id: "5e5580d6f72291487ec648de", login: "loginName" }
          ) {
            name
          }
        }
      `;
      const expectedData = { data: { addUserFollower: { name: userData.name } } };
      const receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });
  });

  describe('createUser', () => {
    it('should receive input argument representing UserInput', async () => {
      const query = `
        mutation m($user: UserInput!) {
          createUser(input: $user) {
            name
          }
        }
      `;
      const user = {
        avatarUrl: 'http://travis.com/avatar.jpg',
        bio: 'bio description',
        company: 'Company',
        email: 'travis@email.com',
        location: 'Brazil',
        login: 'travis',
        name: 'Travis Way',
        url: 'https://github.com/travis'
      };
      UserModel.mockImplementationOnce(arg => {
        const promise = Promise.resolve(arg);
        promise.save = function () { return this; };
        return promise;
      });

      const variableValues = { user };
      const expectedData = { data: { createUser: { name: user.name } } };
      const receivedData = await graphql(schema, query, undefined, undefined, variableValues);
      expect(receivedData).toEqual(expectedData);
    });
  });

  describe('removeUserFollower', () => {
    it('argument id should be provided in a valid format', async () => {
      let query = `
        mutation {
          removeUserFollower {
            name
          }
        }
      `;
      let error = new GraphQLError(
        'Field "removeUserFollower" argument "id" of type "ID!" is required, but it was not provided.'
      );
      let expectedData = { errors: [ error ] };
      let receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);

      query = `
        mutation {
          removeUserFollower(id: "invalid id") {
            name
          }
        }
      `;
      error = new GraphQLError('Invalid args.: invalid id');
      expectedData = { data: { removeUserFollower: null }, errors: [ error ] };
      receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);

      query = `
        mutation {
          removeUserFollower(id: "5e5580d6f72291487ec648dc") {
            name
          }
        }
      `;
      expectedData = { data: { removeUserFollower: { name: userData.name } } };
      receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });
  });

  describe('updateUserName', () => {
    it('argument id should be provided in a valid format', async () => {
      let query = `
        mutation {
          updateUserName(
            input: "New user name"
          ) {
            name
          }
        }
      `;
      let error = new GraphQLError(
        'Field "updateUserName" argument "id" of type "ID!" is required, but it was not provided.'
      );
      let expectedData = { errors: [ error ] };
      let receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);

      query = `
        mutation {
          updateUserName(
            id: "invalid id"
            input: "New user name"
            ) {
            name
          }
        }
      `;
      error = new GraphQLError('Invalid args.: invalid id');
      expectedData = { data: { updateUserName: null }, errors: [ error ] };
      receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);

      query = `
        mutation {
          updateUserName(
            id: "5e5580d6f72291487ec648dc"
            input: "New user name"
          ) {
            name
          }
        }
      `;
      expectedData = { data: { updateUserName: { name: userData.name } } };
      receivedData = await graphql(schema, query);
      expect(receivedData).toEqual(expectedData);
    });

    it('should receive input argument representing user name', async () => {
      const query = `
        mutation {
          updateUserName(
            id: "5e5580d6f72291487ec648dc"
            input: "New user name"
          ) {
            name
          }
        }
      `;
      const user = {
        name: 'New user name',
      };
      UserModel.findOneAndUpdate.mockImplementation(() => Promise.resolve(user));

      const variableValues = { user };
      const expectedData = { data: { updateUserName: { name: user.name } } };
      const receivedData = await graphql(schema, query, undefined, undefined, variableValues);
      expect(receivedData).toEqual(expectedData);
    });
  });
});
