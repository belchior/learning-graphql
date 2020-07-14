
import {
  TCursorConnection,
  TFindPageInfoArgs,
  TOrganization,
  TPageInfoFnQueryArgs,
  TPageInfoItem,
  TPaginationArgs,
  TPaginationQueryArgs,
  TUser,
} from '../utils/interfaces';
import {
  emptyCursorConnection,
  itemsToCursorConnection,
  itemsToPageInfoQuery,
  paginationArgsToQueryArgs,
} from './referencePagination';
import { organizationData, userData } from '../utils/mockData';


const removeWhitespace = (str: string) => str.replace(/\s+/g, ' ');


describe('paginationArgsToQueryArgs', () => {
  describe('forward function', () => {
    it('should receive a pagination arg and return an object to be used to compose forward pagination query', () => {
      const args: TPaginationArgs = {
        first: 50,
        after: 'MTE5',
      };
      const expectedQueryArgs: TPaginationQueryArgs = {
        limit: 50,
        operator: '>',
        order: 'ASC',
        reference: '119',
      };
      const receivedQueryArgs = paginationArgsToQueryArgs(args);

      expect(receivedQueryArgs).toEqual(expectedQueryArgs);
    });
  });

  describe('backward function', () => {
    it('should receive a pagination arg and return an object to be used to compose backward pagination query', () => {
      const args: TPaginationArgs = {
        last: 50,
        before: 'MTIw',
      };
      const expectedQueryArgs: TPaginationQueryArgs = {
        limit: 50,
        operator: '<',
        order: 'DESC',
        reference: '120',
      };
      const receivedQueryArgs = paginationArgsToQueryArgs(args);

      expect(receivedQueryArgs).toEqual(expectedQueryArgs);
    });
  });
});

describe('emptyCursorConnection', () => {
  it('should return a empty cursor connection structure', () => {
    const expectedEmptyCursorConnection: TCursorConnection<TUser> = {
      edges: [],
      pageInfo: {
        hasPreviousPage: false,
        hasNextPage: false,
      }
    };
    const receivedEmptyCursorConnection = emptyCursorConnection<TUser>();

    expect(receivedEmptyCursorConnection).toEqual(expectedEmptyCursorConnection);
  });
});

describe('itemsToPageInfoQuery', () => {
  it('should return a SQL query generated base a list of items', () => {
    const items = [userData];
    const pageInfoFnQuery = (args: TPageInfoFnQueryArgs) => (`
      SELECT users.login, '${args.row}' AS row
      FROM organizations_users
      JOIN users ON user_login = users.login
      WHERE
        organization_login = 'johndoe'
        and users.id ${args.operator} ${args.reference}
      ORDER BY users.id ${args.order}
      LIMIT 1
    `);

    const args: TFindPageInfoArgs<TUser> = { items, pageInfoFnQuery };
    const expectedSQLQuery = removeWhitespace(`
      SELECT * FROM (
        SELECT users.login, 'prev' AS row
          FROM organizations_users
          JOIN users ON user_login = users.login
          WHERE
            organization_login = 'johndoe'
            and users.id < 5558
          ORDER BY users.id DESC
          LIMIT 1
      ) as prev
      UNION
      SELECT * FROM (
        SELECT users.login, 'next' AS row
          FROM organizations_users
          JOIN users ON user_login = users.login
          WHERE
            organization_login = 'johndoe'
            and users.id > 5558
          ORDER BY users.id ASC
          LIMIT 1
      ) as next
    `);
    const receivedSQLQuery = removeWhitespace(itemsToPageInfoQuery(args));

    expect(receivedSQLQuery).toEqual(expectedSQLQuery);
  });
});

describe('itemsToCursorConnection', () => {
  it('should convert a list of items into a cursor connection structure', () => {
    const items: TOrganization[] = [organizationData];
    const pageInfoItems: TPageInfoItem[] = [];
    const expectedCursorConnection: TCursorConnection<TOrganization> = {
      edges: [{
        cursor: 'NTYxMA==',
        node: organizationData,
      }],
      pageInfo: {
        endCursor: 'NTYxMA==',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: 'NTYxMA==',
      }
    };
    const cursorConnection = itemsToCursorConnection(items, pageInfoItems);

    expect(cursorConnection).toEqual(expectedCursorConnection);
  });

  it('should return empty cursor connection when the item list is empty', () => {
    const items: TOrganization[] = [];
    const pageInfoItems: TPageInfoItem[] = [];
    const expectedCursorConnection: TCursorConnection<TOrganization> = emptyCursorConnection();
    const cursorConnection = itemsToCursorConnection(items, pageInfoItems);

    expect(cursorConnection).toEqual(expectedCursorConnection);
  });
});
