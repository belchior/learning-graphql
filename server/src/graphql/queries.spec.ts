import { graphql, GraphQLError } from 'graphql';

import { createLoaders } from '../entities/loaders';
import { find } from '../db';
import { schema } from './schema';
import { userData } from '../utils/mockData';

jest.mock('../db');


describe('user query', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should resolve to a User', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));
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
          id: userData.id,
          __typename: userData.__typename
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(1);
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
