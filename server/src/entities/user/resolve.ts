
import {
  TGraphQLContext,
  TPaginationArgs,
  TUser,
  TArgs,
  TPageInfoFnQueryArgs,
  TPageInfoItem,
  TOrganization,
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


export const User = {
  followers: async (parent: TUser, args: TPaginationArgs) => {
    try {
      const pagination = paginationArgsToQueryArgs(args);
      const startFrom = Number.isSafeInteger(Number(pagination.reference))
        ? `and users.id ${pagination.operator} '${pagination.reference}'`
        : '';

      const itemsQuery = `
        SELECT *
        FROM (
          SELECT users.*
          FROM users
          INNER JOIN users_followers on
            users.login = users_followers.follower_login
          WHERE
            user_login = '${parent.login}'
            ${startFrom}
          ORDER BY users.id ${pagination.order}
          LIMIT ${pagination.limit}
        ) as users
        ORDER BY users.id ASC
      `;

      const pageInfoFnQuery = (queryArgs: TPageInfoFnQueryArgs) => `
        SELECT users.login, '${queryArgs.row}' as row
        FROM users
        INNER JOIN users_followers on users_followers.follower_login = users.login
        WHERE
          user_login = '${parent.login}'
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

  following: async (parent: TUser, args: TPaginationArgs) => {
    try {
      const pagination = paginationArgsToQueryArgs(args);
      const startFrom = Number.isSafeInteger(Number(pagination.reference))
        ? `and users.id ${pagination.operator} '${pagination.reference}'`
        : '';

      const itemsQuery = `
        SELECT *
        FROM (
          SELECT users.*
          FROM users
          INNER JOIN users_following ON
            users.login = users_following.following_login
          WHERE
            user_login = '${parent.login}'
            ${startFrom}
          ORDER BY users.id ${pagination.order}
          LIMIT ${pagination.limit}
        ) AS users
        ORDER BY users.id ASC
      `;

      const pageInfoFnQuery = (queryArgs: TPageInfoFnQueryArgs) => `
        SELECT users.login, '${queryArgs.row}' AS row
        FROM users
        INNER JOIN users_following ON
          users_following.following_login = users.login
        WHERE
          user_login = '${parent.login}'
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

  organizations: async (parent: TUser, args: TPaginationArgs) => {
    try {
      const pagination = paginationArgsToQueryArgs(args);
      const startFrom = Number.isSafeInteger(Number(pagination.reference))
        ? `and organizations.id ${pagination.operator} '${pagination.reference}'`
        : '';

      const itemsQuery = `
        SELECT *
        FROM (
          SELECT organizations.*
          FROM organizations_users
          JOIN organizations ON organizations.login = organization_login
          WHERE
            user_login = '${parent.login}'
            ${startFrom}
          ORDER BY organizations.id ${pagination.order}
          LIMIT ${pagination.limit}
        ) as organizations
        ORDER BY organizations.id ASC
      `;

      const pageInfoFnQuery = (queryArgs: TPageInfoFnQueryArgs) => `
        SELECT organizations.login, '${queryArgs.row}' AS row
        FROM organizations_users
        JOIN organizations ON organizations.login = organization_login
        WHERE
          user_login = '${parent.login}'
          AND organizations.id ${queryArgs.operator} ${queryArgs.reference}
        ORDER BY organizations.id ${queryArgs.order}
        LIMIT 1
      `;

      const { rows: items } = await find<TOrganization>(itemsQuery);
      if (items.length === 0) return emptyCursorConnection<TOrganization>();

      const pageInfoItemsQuery = itemsToPageInfoQuery({ items, pageInfoFnQuery });
      const { rows: pageInfoItems } = await find<TPageInfoItem>(pageInfoItemsQuery);

      return itemsToCursorConnection<TOrganization>(items, pageInfoItems);
    } catch (error) {
      return handleError(error);
    }
  },

  repositories: Repository.repositories,
};

export const Query = {
  user: async (parent: undefined, args: TArgs, context: TGraphQLContext) => {
    return context.loader.findUserByLogin.load(args.login);
  },
};
