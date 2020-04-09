import {
  GraphQLError,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  graphql,
} from 'graphql';

import { IPaginationArgs } from './interfaces';
import { Repository as RepositoryModel } from '../entities/repository/model';
import { User as UserModel } from '../entities/user/model';
import { mutationFields } from './mutations';
import { userData, repositoryData } from '../utils/mockData';

jest.mock('../entities/user/model');
jest.mock('../entities/repository/model');

(UserModel.findOneAndUpdate as jest.Mock).mockImplementation(() => Promise.resolve(userData));

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      empty: { type: GraphQLString, resolve: () => '' }
    }),
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
      ...mutationFields,
    }),
  }),
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
    let expectedData: any = { errors: [ error ] };
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

describe('createRepository', () => {
  it('should receive input argument representing RepositoryInput', async () => {
    (RepositoryModel as any).mockImplementationOnce((arg: IPaginationArgs) => {
      const promise: any = Promise.resolve(arg);
      promise.save = function(){return this;};
      return promise;
    });

    const repo = { ...repositoryData };
    delete repo.__typename;
    delete repo.id;
    delete repo.owner;

    const query = `
      mutation m($repo: RepositoryInput!) {
        createRepository(input: $repo) {
          name
        }
      }
    `;

    const variableValues = { repo };
    const expectedData = { data: { createRepository: { name: repositoryData.name } } };
    const receivedData = await graphql(schema, query, undefined, undefined, variableValues);
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
    (UserModel as any).mockImplementationOnce((arg: IPaginationArgs) => {
      const promise: any = Promise.resolve(arg);
      promise.save = function(){return this;};
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
    let expectedData: any = { errors: [ error ] };
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
    let expectedData: any = { errors: [ error ] };
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
    (UserModel.findOneAndUpdate as jest.Mock).mockImplementation(() => Promise.resolve(user));

    const variableValues = { user };
    const expectedData = { data: { updateUserName: { name: user.name } } };
    const receivedData = await graphql(schema, query, undefined, undefined, variableValues);
    expect(receivedData).toEqual(expectedData);
  });
});
