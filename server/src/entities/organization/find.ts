import { find } from '../../db';
import { TOrganization } from '../../utils/interfaces';
import { handleError } from '../../utils/error-handler';


export const findOrganizationsByLogins = async (logins: readonly string[]) => {
  const query = 'SELECT * FROM organizations WHERE login = ANY($1)';

  try {
    const { rows: items } = await find<TOrganization>(query, [logins]);
    return logins.map(login => (
      items.find(org => org.login === login) ||
      new Error(`Organization not found with login: ${login}`)
    ));
  } catch (error) {
    return handleError(error);
  }
};
