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
import { Repository } from '../repository/resolve';
import { find } from '../../db';
import { handleError } from '../../utils/error-handler';
import { isISOString } from '../../utils/boolean';


type TFollower = TUser & { followed_at: Date };
type TFollowing = TUser & { following_at: Date };
type TUserOrganization = TOrganization & { joined_at: Date };


export const User = {
  followers: async (parent: TUser, args: TPaginationArgs) => {
    try {
      const referenceFrom = (item: TFollower) => item.followed_at.toISOString();

      const pagination = paginationArgsToQueryArgs(args);
      const startFrom = pagination.reference && isISOString(pagination.reference)
        ? `AND users_followers.created_at ${pagination.operator} TIMESTAMP WITH TIME ZONE '${pagination.reference}'`
        : '';

      const itemsQuery = `
        SELECT *
        FROM (
          SELECT users.*, users_followers.created_at AS followed_at
          FROM users
          INNER JOIN users_followers ON users.login = users_followers.follower_login
          WHERE
            user_login = '${parent.login}'
            ${startFrom}
          ORDER BY users_followers.created_at ${pagination.order}
          LIMIT ${pagination.limit}
        ) AS users
        ORDER BY followed_at ASC
      `;

      const pageInfoFnQuery = (queryArgs: TPageInfoFnQueryArgs) => `
        SELECT users.login, '${queryArgs.row}' AS row
        FROM users
        INNER JOIN users_followers ON users_followers.follower_login = users.login
        WHERE
          user_login = '${parent.login}'
          AND users_followers.created_at ${queryArgs.operator} TIMESTAMP WITH TIME ZONE '${queryArgs.reference}'
        ORDER BY users_followers.created_at ${queryArgs.order}
        LIMIT 1
      `;

      const { rows: items } = await find<TFollower>(itemsQuery);
      if (items.length === 0) return emptyCursorConnection<TFollower>();

      const pageInfoQuery = itemsToPageInfoQuery({ items, pageInfoFnQuery, referenceFrom });
      const { rows: pageInfoItems } = await find<TPageInfoItem>(pageInfoQuery);

      return itemsToCursorConnection<TFollower>({ items, pageInfoItems, referenceFrom, });
    } catch (error) {
      return handleError(error);
    }
  },

  following: async (parent: TUser, args: TPaginationArgs) => {
    try {
      const referenceFrom = (item: TFollowing) => item.following_at.toISOString();

      const pagination = paginationArgsToQueryArgs(args);
      const startFrom = pagination.reference && isISOString(pagination.reference)
        ? `AND users_following.created_at ${pagination.operator} TIMESTAMP WITH TIME ZONE '${pagination.reference}'`
        : '';

      const itemsQuery = `
        SELECT *
        FROM (
          SELECT users.*, users_following.created_at AS following_at
          FROM users
          INNER JOIN users_following ON users.login = users_following.following_login
          WHERE
            user_login = '${parent.login}'
            ${startFrom}
          ORDER BY users_following.created_at ${pagination.order}
          LIMIT ${pagination.limit}
        ) AS users
        ORDER BY following_at ASC
      `;

      const pageInfoFnQuery = (queryArgs: TPageInfoFnQueryArgs) => `
        SELECT users.login, '${queryArgs.row}' AS row
        FROM users
        INNER JOIN users_following ON users_following.following_login = users.login
        WHERE
          user_login = '${parent.login}'
          AND users_following.created_at ${queryArgs.operator} TIMESTAMP WITH TIME ZONE '${queryArgs.reference}'
        ORDER BY users_following.created_at ${queryArgs.order}
        LIMIT 1
      `;

      const { rows: items } = await find<TFollowing>(itemsQuery);
      if (items.length === 0) return emptyCursorConnection<TFollowing>();

      const pageInfoQuery = itemsToPageInfoQuery({ items, pageInfoFnQuery, referenceFrom });
      const { rows: pageInfoItems } = await find<TPageInfoItem>(pageInfoQuery);

      return itemsToCursorConnection<TFollowing>({ items, pageInfoItems, referenceFrom, });
    } catch (error) {
      return handleError(error);
    }
  },

  organizations: async (parent: TUser, args: TPaginationArgs) => {
    try {
      const referenceFrom = (item: TUserOrganization) => item.joined_at.toISOString();

      const pagination = paginationArgsToQueryArgs(args);
      const startFrom = pagination.reference && isISOString(pagination.reference)
        ? `AND organizations_users.created_at ${pagination.operator} TIMESTAMP WITH TIME ZONE '${pagination.reference}'`
        : '';

      const itemsQuery = `
        SELECT *
        FROM (
          SELECT organizations.*, organizations_users.created_at AS joined_at
          FROM organizations_users
          JOIN organizations ON organizations.login = organization_login
          WHERE
            user_login = '${parent.login}'
            ${startFrom}
          ORDER BY organizations_users.created_at ${pagination.order}
          LIMIT ${pagination.limit}
        ) AS organizations
        ORDER BY joined_at ASC
      `;

      const pageInfoFnQuery = (queryArgs: TPageInfoFnQueryArgs) => `
        SELECT organizations.login, '${queryArgs.row}' AS row
        FROM organizations_users
        JOIN organizations ON organizations.login = organization_login
        WHERE
          user_login = '${parent.login}'
          AND organizations_users.created_at ${queryArgs.operator} TIMESTAMP WITH TIME ZONE '${queryArgs.reference}'
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

  starredRepositories: Repository.starredRepositories,
};

export const Query = {
  user: async (parent: undefined, args: TArgs, context: TGraphQLContext) => {
    return context.loader.findUserByLogin.load(args.login);
  },
};
