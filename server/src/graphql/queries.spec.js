import { GraphQLError, graphql } from 'graphql';

import { Organization as OrganizationModel } from '../entities/organization/model';
import { User as UserModel } from '../entities/user/model';
import { createLoaders } from '../entities/loaders';
import { organizationData, userData } from '../utils/mockData';
import { schema } from './schema';


jest.mock('../entities/user/model');
jest.mock('../entities/organization/model');
jest.mock('../entities/repository/model');


describe('organization query', () => {
  beforeEach(() => {
    OrganizationModel.find.mockReset();
  });

  it('should resolve to an Organization', async () => {
    OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));

    const query = `
      {
        organization(login: "acme") {
          id
          __typename
        }
      }
    `;
    const expectedData = {
      data: {
        organization: {
          id: organizationData._id.toString(),
          __typename: 'Organization'
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
  });

  it('should return error when the login argument was not provided', async () => {
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
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
  });
});

describe('profile query', () => {
  beforeEach(() => {
    OrganizationModel.find.mockReset();
    UserModel.find.mockReset();
  });

  it('should resolve to UserType when login match a User', async () => {
    OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([]));
    UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));

    const query = `
      {
        profile(login: "johndoe") {
          id
          __typename
        }
      }
    `;
    const expectedData = {
      data: {
        profile: {
          id: userData._id.toString(),
          __typename: 'User'
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
  });

  it('should resolve to OrganizationType when login match an Organization', async () => {
    OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));
    UserModel.find.mockImplementationOnce(() => Promise.resolve([]));

    const query = `
      {
        profile(login: "acme") {
          id
          __typename
        }
      }
    `;
    const expectedData = {
      data: {
        profile: {
          id: organizationData._id.toString(),
          __typename: 'Organization'
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
  });

  it('should throw un error when the received data don\'t match known implementors', async () => {
    const unknownType = { login: 'unknown', __typename: 'unknown' };
    OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([unknownType]));
    UserModel.find.mockImplementationOnce(() => Promise.resolve([]));

    const query = `
      {
        profile(login: "unknown") {
          login
          __typename
        }
      }
    `;
    const error = new GraphQLError('Invalid typename: unknown');
    const expectedData = { data: { profile: null }, errors: [error] };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
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
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);
    expect(receivedData).toEqual(expectedData);
  });
});

describe('user query', () => {
  beforeEach(() => {
    UserModel.find.mockReset();
  });

  it('should resolve to a User', async () => {
    UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));
    const query = `
      {
        user(login: "johndoe") {
          id
          __typename
        }
      }
    `;
    const expectedData = {
      data: {
        user: {
          id: userData._id.toString(),
          __typename: userData.__typename
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
  });

  it('should return error when the login argument was not provided', async () => {
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
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
  });
});
