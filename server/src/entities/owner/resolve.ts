import { Query as userQuery } from '../user/resolve';
import { Query as organizationQuery } from '../organization/resolve';
import { handleError } from '../../utils/error-handler';

export const Query = {
  profile: async (parent, args) => {
    return Promise
      .all([
        userQuery.user(parent, args),
        organizationQuery.organization(parent, args),
      ])
      .then(([user, organization]) => (user || organization))
      .catch(handleError);
  }
};
