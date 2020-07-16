
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
import { find } from '../../db';
import { handleError } from '../../utils/error-handler';
import { Repository } from '../repository/resolve';


export const Organization = {
  people: async (parent: TOrganization, args: TPaginationArgs) => {
    try {
      const pagination = paginationArgsToQueryArgs(args);
      const startFrom = Number.isSafeInteger(Number(pagination.reference))
        ? `and users.id ${pagination.operator} '${pagination.reference}'`
        : '';

      const itemsQuery = `
        SELECT *
        FROM (
          SELECT users.*
          FROM organizations_users
          JOIN users ON user_login = users.login
          WHERE
            organization_login = '${parent.login}'
            ${startFrom}
          ORDER BY users.id ${pagination.order}
          LIMIT ${pagination.limit}
        ) as users
        ORDER BY users.id ASC
      `;

      const pageInfoFnQuery = (queryArgs: TPageInfoFnQueryArgs) => `
        SELECT users.login, '${queryArgs.row}' AS row
        FROM organizations_users
        JOIN users ON user_login = users.login
        WHERE
          organization_login = '${parent.login}'
          and users.id ${queryArgs.operator} ${queryArgs.reference}
        ORDER BY users.id ${queryArgs.order}
        LIMIT 1
      `;

      const referenceFrom = (item: TUser) => String(item.id);

      const { rows: items } = await find<TUser>(itemsQuery);
      if (items.length === 0) return emptyCursorConnection<TUser>();

      const pageInfoQuery = itemsToPageInfoQuery({ items, pageInfoFnQuery, referenceFrom });
      const { rows: pageInfoItems } = await find<TPageInfoItem>(pageInfoQuery);

      return itemsToCursorConnection<TUser>({ items, pageInfoItems, referenceFrom, });
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
