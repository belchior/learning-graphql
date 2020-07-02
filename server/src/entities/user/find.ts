import { find } from '../../db';
import { IUser } from '../../utils/interfaces';
import { handleError } from '../../utils/error-handler';


export const findUsersByLogins = async (logins: readonly string[]) => {
  const query = 'SELECT * FROM users WHERE login in ($1)';
  const args = [logins.join()];

  try {
    const result = await find<IUser>(query, args);
    const users = logins.map(login => (
      result.rows.find(user => user.login === login) ||
      new Error(`User not found for login: ${login}`)
    ));

    return users;
  } catch (error) {
    return handleError(error);
  }
};

