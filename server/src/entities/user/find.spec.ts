
import { findUsersByLogins } from './find';
import { find } from '../../db';
import { userData } from '../../utils/mockData';
jest.mock('../../db');


describe('findUsersByLogins', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should find users that match with the received list of logins', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));

    const logins = ['johndoe'];
    const receivedResult = await findUsersByLogins(logins);
    const expectedResult = [userData];

    expect(receivedResult).toEqual(expectedResult);
    expect(find).toHaveBeenCalledTimes(1);
  });

  it('should return un error when no user match with the login list', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [userData] }));

    const logins = ['johndoe', 'gina'];
    const receivedResult = await findUsersByLogins(logins);
    const expectedResult = [userData, new Error('No user found with login: gina')];

    expect(receivedResult).toEqual(expectedResult);
    expect(find).toHaveBeenCalledTimes(1);
  });
});
