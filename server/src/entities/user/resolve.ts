
import {
  ICursorConnectionConfig,
  IGraphQLContext,
  IPageInfo,
  IPaginationArgs,
  IUser,
  TArgs,
  TOperator,
  TOrder,
} from '../../utils/interfaces';
import { find } from '../../db';
import {
  getCursorConnection,
  keyToCursor,
  paginationArgs,
} from '../../cursor-connection/referencePagination';
import { handleError } from '../../utils/error-handler';


type TPrevOrNext = 'prev' | 'next';
interface IGetPageInfoConfig {
  key: string
  operator: TOperator
  order: TOrder
  row: TPrevOrNext
}
interface IPageInfoRow {
  row: TPrevOrNext
}

const getPageInfoQuery = (getRowQuery: Function) => (firstItem: IUser, lastItem: IUser) => {
  const prevQuery = getRowQuery({
    key: firstItem.id,
    operator: '<',
    order: 'DESC',
    row: 'prev',
  });
  const nextQuery = getRowQuery({
    key: lastItem.id,
    operator: '>',
    order: 'ASC',
    row: 'next',
  });

  return `
    SELECT * FROM (${prevQuery}) as prev
    UNION
    SELECT * FROM (${nextQuery}) as next
  `;
};

const getPageInfo = async (getPageInfoQuery: Function, items: IUser[]) => {
  if (items.length === 0) {
    const pageInfo: IPageInfo = {
      hasNextPage: false,
      hasPreviousPage: false,
    };
    return pageInfo;
  }

  const hasRow = (name: TPrevOrNext, items: IPageInfoRow[]) => items.reduce(
    (acc: boolean, item: IPageInfoRow) => (acc === true || item.row === name),
    false
  );

  const firstItem = items[0];
  const lastItem = items[items.length -1];
  const query = getPageInfoQuery(firstItem, lastItem);

  const result = await find<IPageInfoRow>(query);

  const pageInfo: IPageInfo = {
    endCursor: keyToCursor(lastItem.id),
    hasNextPage: hasRow('prev', result.rows),
    hasPreviousPage: hasRow('next', result.rows),
    startCursor: keyToCursor(firstItem.id),
  };
  return pageInfo;
};


export const User = {
  followers: async (parent: IUser, args: IPaginationArgs) => {
    const pagination = paginationArgs(args);
    const startFrom = pagination.key
      ? `and users.id ${pagination.operator} ${pagination.key}`
      : '';

    const query = `
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

    const getRowQuery = (config: IGetPageInfoConfig) => `
      SELECT users.login, '${config.row}' as row
      FROM users
      INNER JOIN users_followers on users_followers.follower_login = users.login
      WHERE
        user_login = '${parent.login}'
        and users.id ${config.operator} ${config.key}
      ORDER BY users.id ${config.order}
      LIMIT 1
    `;

    try {
      const { rows: items } = await find<IUser>(query);
      const pageInfo = await getPageInfo(getPageInfoQuery(getRowQuery), items);
      const config: ICursorConnectionConfig<IUser> = { items, pageInfo };

      return getCursorConnection<IUser>(config);
    } catch (error) {
      return handleError(error);
    }
  },

  following: async (parent: IUser, args: IPaginationArgs) => {
    const pagination = paginationArgs(args);
    const startFrom = pagination.key
      ? `and users.id ${pagination.operator} ${pagination.key}`
      : '';

    const query = `
      SELECT *
      FROM (
        SELECT users.*
        FROM users
        INNER JOIN users_following on
          users.login = users_following.following_login
        WHERE
          user_login = '${parent.login}'
          ${startFrom}
        ORDER BY users.id ${pagination.order}
        LIMIT ${pagination.limit}
      ) as users
      ORDER BY users.id ASC
    `;

    const getRowQuery = (config: IGetPageInfoConfig) => `
      SELECT users.login, '${config.row}' as row
      FROM users
      INNER JOIN users_following on users_following.following_login = users.login
      WHERE
        user_login = '${parent.login}'
        and users.id ${config.operator} ${config.key}
      ORDER BY users.id ${config.order}
      LIMIT 1
    `;

    try {
      const { rows: items } = await find<IUser>(query);
      const pageInfo = await getPageInfo(getPageInfoQuery(getRowQuery), items);
      const config: ICursorConnectionConfig<IUser> = { items, pageInfo };

      return getCursorConnection<IUser>(config);
    } catch (error) {
      return handleError(error);
    }
  },
};

export const Query = {
  user: async (parent: any, args: TArgs, context: IGraphQLContext) => {
    return context.loader.findUserByLogin.load(args.login);
  },
};
