import { Query as organizationQuery } from '../organization/resolve';
import { Query as userQuery } from '../user/resolve';
import { TArgs, TGraphQLContext } from '../../utils/interfaces';
import { handleError } from '../../utils/error-handler';


export const Query = {
  profile: async (parent: any, args: TArgs, context: TGraphQLContext) => {
    try {
      const userPromise = userQuery.user(parent, args, context);
      const organizationPromise = organizationQuery.organization(parent, args, context);

      const result = await Promise.allSettled([userPromise, organizationPromise]);

      const item = result.find(item => item.status === 'fulfilled');

      if (item && 'value' in item) return item.value;
      throw new Error(`Profile not found with login: ${args.login}`);
    } catch (error) {
      return handleError(error);
    }
  }
};
