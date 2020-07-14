
import { TRepositoryOwner, TOwnerIdentifier } from '../../utils/interfaces';
import { find } from '../../db';
import { findRepositoryOwners } from './find';
import { ownerDataUser, ownerDataOrganization } from '../../utils/mockData';
import { serialize } from '../../utils/converter';


jest.mock('../../db');


describe('findRepositoryOwners', () => {
  beforeEach(() => {
    (find as jest.Mock).mockReset();
  });

  it('should find a user that match to the serialized owner identifier', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [ownerDataUser] }));

    const ownerIdentifiers = [
      serialize<TOwnerIdentifier>({ owner_login: ownerDataUser.login, owner_ref: 'users' })
    ];
    const expectedOwners: TRepositoryOwner[] = [
      ownerDataUser,
    ];
    const receivedOwners = await findRepositoryOwners(ownerIdentifiers);

    expect(receivedOwners).toEqual(expectedOwners);
    expect(find).toHaveBeenCalledTimes(1);
  });

  it('should find an organization that match to the serialized owner identifier', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [ownerDataOrganization] }));

    const ownerIdentifiers = [
      serialize<TOwnerIdentifier>({ owner_login: ownerDataOrganization.login, owner_ref: 'organizations' })
    ];
    const expectedOwners: TRepositoryOwner[] = [
      ownerDataOrganization,
    ];
    const receivedOwners = await findRepositoryOwners(ownerIdentifiers);

    expect(receivedOwners).toEqual(expectedOwners);
    expect(find).toHaveBeenCalledTimes(1);
  });

  it('should return an "not found" error when no owner match with the identifier', async () => {
    (find as jest.Mock).mockImplementationOnce(() => Promise.resolve({ rows: [] }));

    const ownerIdentifiers = [
      serialize<TOwnerIdentifier>({ owner_login: 'unknown', owner_ref: 'users' })
    ];
    const expectedOwners = [
      new Error('Repository Owner not found with login: unknown'),
    ];
    const receivedOwners = await findRepositoryOwners(ownerIdentifiers);

    expect(receivedOwners).toEqual(expectedOwners);
    expect(find).toHaveBeenCalledTimes(1);
  });
});
