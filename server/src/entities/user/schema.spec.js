import {
  GraphQLError,
  GraphQLObjectType,
  GraphQLSchema,
  graphql,
} from 'graphql';

import { User as UserModel } from './model';
import { Repository as RepositoryModel } from '../repository/model';
import * as userSchema from './schema';

jest.mock('./model');
jest.mock('../repository/model');


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
  organizations: [{ name: 'Organization name' }],
  repositories: [{ name: 'Repo name' }],
  starredRepositories: [{ name: 'Starred repo name' }],
  url: 'https://github.com/johndoe',
  websiteUrl: 'http://johndoe.com',
};
UserModel.findOne.mockImplementation(() => Promise.resolve(userData));
UserModel.findOneAndUpdate.mockImplementation(() => Promise.resolve(userData));


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

  describe('followers field', () => {
    it('should execute successfully', async () => {
      UserModel.aggregate.mockImplementationOnce(() => Promise.resolve(userData.followers));

      const query = `
        query User {
          user(login: "johndoe") {
            name
            followers(first: 1) {
              name
            }
          }
        }
      `;
      const expectedData = { data: { user: {
        name: userData.name,
        followers: userData.followers,
      } } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      const query = `
        query User {
          user(login: "johndoe") {
            followers {
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

  describe('organizations field', () => {
    it('should execute successfully', async () => {
      UserModel.aggregate.mockImplementationOnce(() => Promise.resolve(userData.organizations));

      const query = `
        query User {
          user(login: "johndoe") {
            name
            organizations(first: 1) {
              name
            }
          }
        }
      `;
      const expectedData = { data: { user: {
        name: userData.name,
        organizations: userData.organizations,
      } } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

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
    it('should execute successfully', async () => {
      RepositoryModel.find.mockImplementationOnce(() => {
        const promise = Promise.resolve(userData.repositories);
        promise.sort = function(){return this;};
        promise.skip = function(){return this;};
        promise.limit = function(){return this;};
        return promise;
      });

      const query = `
        query User {
          user(login: "johndoe") {
            name
            repositories(first: 1) {
              name
            }
          }
        }
      `;
      const expectedData = { data: { user: {
        name: userData.name,
        repositories: userData.repositories,
      } } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

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

  describe('starredepositories field', () => {
    it('should execute successfully', async () => {
      UserModel.aggregate.mockImplementationOnce(
        () => Promise.resolve(userData.starredRepositories)
      );

      const query = `
        query User {
          user(login: "johndoe") {
            name
            starredRepositories(first: 1) {
              name
            }
          }
        }
      `;
      const expectedData = { data: { user: {
        name: userData.name,
        starredRepositories: userData.starredRepositories,
      } } };
      const receivedData = await graphql(schema, query);

      expect(receivedData).toEqual(expectedData);
    });

    it('should return error when the pagination arguments was not provided', async () => {
      const query = `
        query User {
          user(login: "johndoe") {
            starredRepositories {
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

describe('addUserFollower mutation', () => {
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

describe('createUser mutation', () => {
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

describe('removeUserFollower mutation', () => {
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

describe('updateUserName mutation', () => {
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
