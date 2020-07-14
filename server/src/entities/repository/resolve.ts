import {
  TPageInfoFnQueryArgs,
  TPageInfoItem,
  TPaginationArgs,
  TRepository,
  TArgs,
  TGraphQLContext,
  TOwnerIdentifier,
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
        ? `and id ${pagination.operator} '${pagination.reference}'`
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

      const { rows: items } = await find<TRepository>(itemsQuery);

      if (items.length === 0) return emptyCursorConnection<TRepository>();

      const pageInfoItemsQuery = itemsToPageInfoQuery({ items, pageInfoFnQuery });
      const { rows: pageInfoItems } = await find<TPageInfoItem>(pageInfoItemsQuery);

      return itemsToCursorConnection<TRepository>(items, pageInfoItems);
    } catch (error) {
      return handleError(error);
    }
  },
};
