
import { createLoaders } from './loaders';
import { Organization as OrganizationModel } from './organization/model';
import { User as UserModel } from './user/model';
import { userData, ownerDataUser, organizationData } from '../utils/mockData';
import { userProjection } from './user/find';


jest.mock('./organization/model');
jest.mock('./user/model');

const loader = createLoaders();

describe('findOrganizationByLogin', () => {
  beforeEach(() => {
    OrganizationModel.find.mockReset();
    loader.findOrganizationByLogin.clearAll();
  });

  it('should return organization that match with the provided login', async () => {
    OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));

    const login = organizationData.login;
    const organizationPromise = loader.findOrganizationByLogin.load(login);

    await expect(organizationPromise).resolves.toBe(organizationData);
    expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
  });
});

describe('findRepositoryOwner', () => {
  beforeEach(() => {
    OrganizationModel.find.mockReset();
    UserModel.find.mockReset();
    loader.findRepositoryOwner.clearAll();
  });

  it('should be able to return user as repostory owner', async () => {
    UserModel.find.mockImplementationOnce(() => Promise.resolve([userData]));

    const serializedOwner = JSON.stringify({ _id: userData._id, ref: 'users' });
    const userPromise = loader.findRepositoryOwner.load(serializedOwner);

    await expect(userPromise).resolves.toBe(userData);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
  });

  it('should be able to return organization as repostory owner', async () => {
    OrganizationModel.find.mockImplementationOnce(() => Promise.resolve([organizationData]));

    const owner = JSON.stringify({ _id: organizationData._id, ref: 'organizations' });
    const userPromise = loader.findRepositoryOwner.load(owner);

    await expect(userPromise).resolves.toBe(organizationData);
    expect(OrganizationModel.find).toHaveBeenCalledTimes(1);
  });
});

describe('findUserById', () => {
  beforeEach(() => {
    UserModel.find.mockReset();
    loader.findUserById.clearAll();
  });

  it('should return user that math with the provided id', async () => {
    UserModel.find.mockImplementationOnce(() => Promise.resolve([userData, ownerDataUser]));
    const id = userData._id;
    const userPromise = loader.findUserById.load(id);

    await expect(userPromise).resolves.toBe(userData);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
  });
});

describe('findUserByLogin', () => {
  beforeEach(() => {
    UserModel.find.mockReset();
    loader.findUserByLogin.clearAll();
  });

  it('should return user that math with the provided login', async () => {
    UserModel.find.mockImplementationOnce(() => Promise.resolve([userData, ownerDataUser]));
    const login = userData.login;
    const userPromise = loader.findUserByLogin.load(login);

    await expect(userPromise).resolves.toBe(userData);
    expect(UserModel.find).toHaveBeenCalledTimes(1);
  });
});

describe('userProjection', () => {
  it('should match the specified structure', () => {
    expect(userProjection).toEqual({
      followers: 0,
      following: 0,
      organizations: 0,
      starredRepositories: 0
    });
  });
});
