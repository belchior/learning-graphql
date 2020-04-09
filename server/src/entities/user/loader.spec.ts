
import { findUserById, findUserByLogin, userProjection } from './loader';
import { User as UserModel } from './model';
import { userData, ownerDataUser } from '../../utils/mockData';

jest.mock('./model');


describe('findUserById', () => {
  it('should return user that math with the provided id', async () => {
    (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData, ownerDataUser]));
    const id = userData._id;
    const userPromise = findUserById.load(id);

    await expect(userPromise).resolves.toBe(userData);
  });
});

describe('findUserByLogin', () => {
  it('should return user that math with the provided login', async () => {
    (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData, ownerDataUser]));
    const login = userData.login;
    const userPromise = findUserByLogin.load(login);

    await expect(userPromise).resolves.toBe(userData);
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
