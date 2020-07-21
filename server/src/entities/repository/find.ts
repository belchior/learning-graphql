import { find } from '../../db';
import { TUser, TOrganization, TRepositoryOwner, TOwnerIdentifier } from '../../utils/interfaces';
import { handleError } from '../../utils/error-handler';
import { deserialize } from '../../utils/converter';


type TKey = TOwnerIdentifier['owner_ref']
type TValue = TOwnerIdentifier['owner_login']
type TRepositoryOwnerLogins = Record<TKey, TValue[]>


const groupByRef = (owners: TOwnerIdentifier[]) => {
  const logins: TRepositoryOwnerLogins = {
    users: [],
    organizations: [],
  };
  for (const owner of owners) {
    if (Array.isArray(logins[owner.owner_ref])) logins[owner.owner_ref].push(owner.owner_login);
  }
  return logins;
};

const fulfilledValues = <T>(result: PromiseSettledResult<T>[]): T[] => {
  const fulfilled = [];
  for ( const item of result ) item.status === 'fulfilled' && fulfilled.push(item.value);
  return fulfilled;
};

export const findRepositoryOwners = async (serializedOwners: readonly string[]) => {
  try {
    const usersQuery = 'SELECT * FROM users WHERE login = ANY($1)';
    const organizationsQuery = 'SELECT * FROM organizations WHERE login = ANY($1)';

    const owners = serializedOwners.map<TOwnerIdentifier>(deserialize);
    const logins = groupByRef(owners);

    const usersPromise = logins.users.length > 0
      ? find<TUser>(usersQuery, [logins.users])
      : Promise.resolve({ rows: [] });

    const organiztionsPromise = logins.organizations.length > 0
      ? find<TOrganization>(organizationsQuery, [logins.organizations])
      : Promise.resolve({ rows: [] });

    const settledResult = await Promise.allSettled([usersPromise, organiztionsPromise]);
    const result = fulfilledValues<{ rows: TRepositoryOwner[] }>(settledResult);
    const items = result.flatMap(item => item.rows);

    return serializedOwners.map(item => {
      const owner = deserialize<TOwnerIdentifier>(item);
      return (
        items.find(item => item.login === owner.owner_login) ||
        new Error(`Repository Owner not found with login: ${owner.owner_login}`)
      );
    });
  } catch (error) {
    return handleError(error);
  }
};
