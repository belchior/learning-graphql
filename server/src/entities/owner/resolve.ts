import { Query as organizationQuery } from '../organization/resolve';
import { Query as userQuery } from '../user/resolve';
import { TArgs } from '../../graphql/interfaces';
import { handleError } from '../../utils/error-handler';


export const Query = {
  profile: async (parent: any, args: TArgs, context: any) => {
    const userPromise = userQuery.user(parent, args, context);
    const organizationPromise = organizationQuery.organization(parent, args, context);
    return Promise
      .all([userPromise, organizationPromise])
      .then(([user, organization]) => (user || organization))
      .catch(handleError);
  }
};
