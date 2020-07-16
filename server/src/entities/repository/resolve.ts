import {
  TPageInfoFnQueryArgs,
  TPageInfoItem,
  TPaginationArgs,
  TRepository,
  TArgs,
  TGraphQLContext,
  TOwnerIdentifier,
  TStarredRepository,
} from '../../utils/interfaces';
import {
  emptyCursorConnection,
  itemsToCursorConnection,
  itemsToPageInfoQuery,
  paginationArgsToQueryArgs,
} from '../../cursor-connection/referencePagination';
import { find } from '../../db';
import { handleError } from '../../utils/error-handler';
import { serialize } from '../../utils/converter';
import { isISOString } from '../../utils/boolean';


export const Repository = {
  forkCount: (parent: TRepository) => {
    return parent.fork_count;
  },

  licenseInfo: (parent: TRepository) => {
    return parent.license_name
      ? { name: parent.license_name }
      : undefined;
  },

  primaryLanguage: (parent: TRepository) => {
    return parent.language_color && parent.language_name
      ? { color: parent.language_color, name: parent.language_name }
      : undefined;
  },

  owner: async (parent: TRepository, args: TArgs, context: TGraphQLContext) => {
    const serializedOwner = serialize<TOwnerIdentifier>({
      owner_login: parent.owner_login,
      owner_ref: parent.owner_ref,
    });
    return context.loader.findRepositoryOwner.load(serializedOwner);
  },

  repositories: async (parent: { login: string }, args: TPaginationArgs) => {
    try {
      const pagination = paginationArgsToQueryArgs(args);
      const startFrom = Number.isSafeInteger(Number(pagination.reference))
        ? `AND id ${pagination.operator} '${pagination.reference}'`
        : '';

      const itemsQuery = `
        SELECT *
        FROM (
          SELECT *
          FROM repositories
          JOIN languages USING(language_name)
          WHERE
            owner_login = '${parent.login}'
            ${startFrom}
          ORDER BY id ${pagination.order}
          LIMIT ${pagination.limit}
        ) as repositories
        ORDER BY id ASC
      `;

      const pageInfoFnQuery = (queryArgs: TPageInfoFnQueryArgs) => `
        SELECT name, '${queryArgs.row}' AS row
        FROM repositories
        WHERE
          owner_login = '${parent.login}'
          AND id ${queryArgs.operator} ${queryArgs.reference}
        ORDER BY id ${queryArgs.order}
        LIMIT 1
      `;

      const referenceFrom = (item: TRepository) => String(item.id);

      const { rows: items } = await find<TRepository>(itemsQuery);

      if (items.length === 0) return emptyCursorConnection<TRepository>();

      const pageInfoQuery = itemsToPageInfoQuery({ items, pageInfoFnQuery, referenceFrom, });
      const { rows: pageInfoItems } = await find<TPageInfoItem>(pageInfoQuery);

      return itemsToCursorConnection<TRepository>({ items, pageInfoItems, referenceFrom, });
    } catch (error) {
      return handleError(error);
    }
  },

  starredRepositories: async (parent: { login: string }, args: TPaginationArgs) => {
    try {
      const pagination = paginationArgsToQueryArgs(args);
      const startFrom = pagination.reference && isISOString(pagination.reference)
        ? `AND starred.created_at ${pagination.operator} TIMESTAMP WITH TIME ZONE '${pagination.reference}'`
        : '';

      const itemsQuery = `
        SELECT *
        FROM (
          SELECT starred.created_at AS starred_at, repositories.*
          FROM users_starred_repositories AS starred
          JOIN repositories ON starred.repository_name = repositories.name
          WHERE
            user_login = '${parent.login}'
            ${startFrom}
          ORDER BY starred.created_at ${pagination.order}
          LIMIT ${pagination.limit}
        ) AS repositories
        ORDER BY starred_at ASC
      `;

      const pageInfoFnQuery = (queryArgs: TPageInfoFnQueryArgs) => `
        SELECT name, '${queryArgs.row}' AS row
        FROM users_starred_repositories AS starred
        JOIN repositories ON starred.repository_name = repositories.name
        WHERE
          starred.user_login = '${parent.login}'
          AND starred.created_at ${queryArgs.operator} TIMESTAMP WITH TIME ZONE '${queryArgs.reference}'
        ORDER BY starred.created_at ${queryArgs.order}
        LIMIT 1
      `;

      const referenceFrom = (item: TStarredRepository) => item.starred_at.toISOString();

      const { rows: items } = await find<TStarredRepository>(itemsQuery);

      if (items.length === 0) return emptyCursorConnection<TStarredRepository>();

      const pageInfoQuery = itemsToPageInfoQuery({ items, pageInfoFnQuery, referenceFrom, });
      const { rows: pageInfoItems } = await find<TPageInfoItem>(pageInfoQuery);

      return itemsToCursorConnection<TStarredRepository>({ items, pageInfoItems, referenceFrom, });
    } catch (error) {
      return handleError(error);
    }
  },
};
