import { Organization as OrganizationModel } from './model';
import { handleError } from '../../utils/error-handler';


export const findOrganizationsByLogins = async (logins) => {
  const query = { login: { $in: logins } };
  return OrganizationModel
    .find(query)
    .then(organizations => (
      logins.map(login => (
        organizations.find(org => org.login === login)
      ))
    ))
    .catch(handleError);
};
