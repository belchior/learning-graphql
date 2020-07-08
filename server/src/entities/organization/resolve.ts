
import {
  TGraphQLContext,
  TOrganization,
  TPaginationArgs,
  TUser,
  TArgs,
  TPageInfoFnQueryArgs,
  TPageInfoItem,
} from '../../utils/interfaces';
import {
  paginationArgsToQueryArgs,
  emptyCursorConnection,
  itemsToCursorConnection,
  itemsToPageInfoQuery,
} from '../../cursor-connection/referencePagination';
import { find } from '../../db';
import { handleError } from '../../utils/error-handler';


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

      const { rows: items } = await find<TUser>(itemsQuery);
      if (items.length === 0) return emptyCursorConnection<TUser>();

      const pageInfoItemsQuery = itemsToPageInfoQuery({ items, pageInfoFnQuery });
      const { rows: pageInfoItems } = await find<TPageInfoItem>(pageInfoItemsQuery);

      return itemsToCursorConnection<TUser>(items, pageInfoItems);
    } catch (error) {
      return handleError(error);
    }
  },
};

export const Query = {
  organization: async (parent: any, args: TArgs, context: TGraphQLContext) => {
    return context.loader.findOrganizationByLogin.load(args.login);
  },
};
