
import { Organization as OrganizationModel } from '../organization/model';
import { findOrganizationByLogin } from './loader';
import { organizationData } from '../../utils/mockData';

jest.mock('../organization/model');


describe('findOrganizationByLogin', () => {
  it('should return organization that match with the provided login', async () => {
    (OrganizationModel.find as jest.Mock).mockImplementationOnce(() => Promise.resolve([organizationData]));

    const login = organizationData.login;
    const organizationPromise = findOrganizationByLogin.load(login);

    await expect(organizationPromise).resolves.toBe(organizationData);
  });
});
