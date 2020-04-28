import { graphql } from 'graphql';
import { makeExecutableSchema } from 'apollo-server-express';

import { Organization as OrganizationModel } from '../entities/organization/model';
import { User as UserModel } from '../entities/user/model';
import { findOrganizationByLogin } from '../entities/organization/loader';
import { findUserByLogin } from '../entities/user/loader';
import { resolvers, typeDefs } from './schema';
import { userData } from '../utils/mockData';


jest.mock('../entities/organization/model');
jest.mock('../entities/user/model');


const schema = makeExecutableSchema({ typeDefs, resolvers, });


describe('schema', () => {
  beforeEach(() => {
    (OrganizationModel.find as jest.Mock).mockReset();
    (UserModel.find as jest.Mock).mockReset();
    findUserByLogin.clearAll();
    findOrganizationByLogin.clearAll();
  });

  it('should be parsed without errors', async () => {
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
    const expectedData = {
      data: {
        profile: {
          id: userData._id.toString(),
          __typename: 'User'
        }
      }
    };
    const receivedData = await graphql(schema, query);

    expect(receivedData).toEqual(expectedData);
    expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
  });
});