
import { createLoaders } from './loaders';
import { userData } from '../utils/mockData';
import { find } from '../db';

jest.mock('../db');


const loader = createLoaders();

describe('findUserByLogin', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should return user that math with the provided login', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));

    const login = userData.login;
    const userPromise = loader.findUserByLogin.load(login);

    await expect(userPromise).resolves.toBe(userData);
    expect(find).toHaveBeenCalledTimes(1);
  });
});
