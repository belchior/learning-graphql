import {
  TArgs,
  TGraphQLContext,
  TOrganization,
  TPageInfoFnQueryArgs,
  TPageInfoItem,
  TPaginationArgs,
  TUser,
} from '../../utils/interfaces';
import {
  emptyCursorConnection,
  itemsToCursorConnection,
  itemsToPageInfoQuery,
  paginationArgsToQueryArgs,
} from '../../cursor-connection/referencePagination';
import { Repository } from '../repository/resolve';
import { find } from '../../db';
import { handleError } from '../../utils/error-handler';
import { isISOString } from '../../utils/boolean';


type TUserOrganization = TUser & { joined_at: Date };


export const Organization = {
  people: async (parent: TOrganization, args: TPaginationArgs) => {
    try {
      const referenceFrom = (item: TUserOrganization) => item.joined_at.toISOString();

      const pagination = paginationArgsToQueryArgs(args);
      const startFrom = pagination.reference && isISOString(pagination.reference)
        ? `AND organizations_users.created_at ${pagination.operator} TIMESTAMP WITH TIME ZONE '${pagination.reference}'`
        : '';

      const itemsQuery = `
        SELECT *
        FROM (
          SELECT users.*, organizations_users.created_at AS joined_at
          FROM organizations_users
          JOIN users ON user_login = users.login
          WHERE
            organization_login = '${parent.login}'
            ${startFrom}
          ORDER BY organizations_users.created_at ${pagination.order}
          LIMIT ${pagination.limit}
        ) AS users
        ORDER BY users.joined_at ASC
      `;

      const pageInfoFnQuery = (queryArgs: TPageInfoFnQueryArgs) => `
        SELECT users.login, '${queryArgs.row}' AS row
        FROM organizations_users
        JOIN users ON user_login = users.login
        WHERE
          organization_login = '${parent.login}'
          and organizations_users.created_at ${queryArgs.operator} TIMESTAMP WITH TIME ZONE '${queryArgs.reference}'
        ORDER BY organizations_users.created_at ${queryArgs.order}
        LIMIT 1
      `;

      const { rows: items } = await find<TUserOrganization>(itemsQuery);
      if (items.length === 0) return emptyCursorConnection<TUserOrganization>();

      const pageInfoQuery = itemsToPageInfoQuery({ items, pageInfoFnQuery, referenceFrom });
      const { rows: pageInfoItems } = await find<TPageInfoItem>(pageInfoQuery);

      return itemsToCursorConnection<TUserOrganization>({ items, pageInfoItems, referenceFrom, });
    } catch (error) {
      return handleError(error);
    }
  },

  repositories: Repository.repositories,
};

export const Query = {
  organization: async (parent: undefined, args: TArgs, context: TGraphQLContext) => {
    return context.loader.findOrganizationByLogin.load(args.login);
  },
};
