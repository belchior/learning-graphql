import { Query as organizationQuery } from '../organization/resolve';
import { Query as userQuery } from '../user/resolve';
import { TArgs, IGraphQLContext } from '../../apollo/interfaces';
import { handleError } from '../../utils/error-handler';


export const Query = {
  profile: async (parent: any, args: TArgs, context: IGraphQLContext) => {
    const userPromise = userQuery.user(parent, args, context);
    const organizationPromise = organizationQuery.organization(parent, args, context);
    return Promise
      .all([userPromise, organizationPromise])
      .then(([user, organization]) => (user || organization))
      .catch(handleError);
  }
};
