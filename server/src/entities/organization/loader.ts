import Dataloader from 'dataloader';

import { handleError } from '../../utils/error-handler';
import { Organization as OrganizationModel } from './model';


const findOrganizationsByLogins = async (logins: readonly string[]) => {
  const query:any = { login: { $in: logins } };
  return OrganizationModel
    .find(query)
    .then(organizations => (
      logins.map(login => (
        organizations.find(org => org.login === login)
      ))
    ))
    .catch(handleError);
};

export const findOrganizationByLogin = new Dataloader(findOrganizationsByLogins);
