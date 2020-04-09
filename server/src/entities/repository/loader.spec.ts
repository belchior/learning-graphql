
import { Organization as OrganizationModel } from '../organization/model';
import { User as UserModel } from '../user/model';
import { findRepositoryOwner } from './loader';
import { userData, organizationData } from '../../utils/mockData';

jest.mock('../organization/model');
jest.mock('../user/model');


describe('findRepositoryOwner', () => {
  beforeEach(() => {
    (UserModel.find as jest.Mock).mockReset();
    (OrganizationModel.find as jest.Mock).mockReset();
  });

  it('should be able to return user that represent repostory owner', async () => {
    (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([userData]));
    (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([]));

    const owner = JSON.stringify({ _id: userData._id, ref: 'users' });
    const userPromise = findRepositoryOwner.load(owner);

    await expect(userPromise).resolves.toBe(userData);
  });

  it('should be able to return organization that represent repostory owner', async () => {
    (UserModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([]));
    (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));

    const owner = JSON.stringify({ _id: organizationData._id, ref: 'organizations' });
    const userPromise = findRepositoryOwner.load(owner);

    await expect(userPromise).resolves.toBe(organizationData);
  });
});
