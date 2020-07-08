
import { findOrganizationsByLogins } from './find';
import { find } from '../../db';
import { organizationData } from '../../utils/mockData';

jest.mock('../../db');


describe('findOrganizationsByLogins', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should find organizations that match with the received list of logins', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }));

    const logins = ['acme'];
    const receivedResult = await findOrganizationsByLogins(logins);
    const expectedResult = [organizationData];

    expect(receivedResult).toEqual(expectedResult);
    expect(find).toHaveBeenCalledTimes(1);
  });

  it('should return un error when no organization match with the login list', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [organizationData] }));

    const logins = ['acme', 'company'];
    const receivedResult = await findOrganizationsByLogins(logins);
    const expectedResult = [organizationData, new Error('Organization not found for login: company')];

    expect(receivedResult).toEqual(expectedResult);
    expect(find).toHaveBeenCalledTimes(1);
  });
});
