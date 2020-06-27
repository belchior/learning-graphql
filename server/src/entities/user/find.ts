import { find } from '../../db';
import { IUser } from '../interfaces';
import { handleError } from '../../utils/error-handler';


export const findUsersByLogins = async (logins: readonly string[]) => {
  const query = 'SELECT * FROM users WHERE login in ($1)';
  const args = [logins.join()];

  try {
    const result = await find<IUser>(query, args);
    const users = logins.map(login => (
      result.rows.find(user => user.login === login) ||
      new Error(`No user found with login: ${login}`)
    ));

    return users;
  } catch (error) {
    return handleError(error);
  }
};

