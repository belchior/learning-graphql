import { graphql } from 'graphql';

import { createLoaders } from '../entities/loaders';
import { find } from '../db';
import { schema } from './schema';
import { userData } from '../utils/mockData';

jest.mock('../db');


describe('UserType', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should return the flattened part of data', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));

    const query = `
      {
        user(login: "johndoe") {
          __typename
          avatarUrl
          bio
          company
          email
          id
          location
          login
          name
          url
          websiteUrl
        }
      }
    `;
    const expectedData = {
      data: {
        user: {
          __typename: userData.__typename,
          avatarUrl: userData.avatarUrl,
          bio: userData.bio,
          company: userData.company,
          email: userData.email,
          id: userData.id,
          location: userData.location,
          login: userData.login,
          name: userData.name,
          url: userData.url,
          websiteUrl: userData.websiteUrl,
        }
      }
    };
    const context = { loader: createLoaders() };
    const receivedData = await graphql(schema, query, undefined, context);

    expect(receivedData).toEqual(expectedData);
    expect(find).toHaveBeenCalledTimes(1);
  });
});
