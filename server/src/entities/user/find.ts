import { find } from '../../db';
import { TUser } from '../../utils/interfaces';
import { handleError } from '../../utils/error-handler';


export const findUsersByLogins = async (logins: readonly string[]) => {
  try {
    const query = 'SELECT * FROM users WHERE login = ANY($1)';

    const { rows: items } = await find<TUser>(query, [logins]);

    const users = logins.map(login => (
      items.find(user => user.login === login) ||
      new Error(`User not found with login: ${login}`)
    ));

    return users;
  } catch (error) {
    return handleError(error);
  }
};
