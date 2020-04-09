import { Query as userQuery } from '../user/resolve';
import { Query as organizationQuery } from '../organization/resolve';
import { handleError } from '../../utils/error-handler';
import { TArgs } from '../../graphql/interfaces';


export const Query = {
  profile: async (parent: any, args: TArgs) => {
    const userPromise = userQuery.user(parent, args);
    const organizationPromise = organizationQuery.organization(parent, args);
    return Promise
      .all([userPromise, organizationPromise])
      .then(([user, organization]) => (user || organization))
      .catch(handleError);
  }
};
