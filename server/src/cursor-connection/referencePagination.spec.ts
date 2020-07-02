import {
  cursorToKey,
  emptyCursorConnection,
  getCursorConnection,
  keyToCursor,
  paginationArgs,
} from './referencePagination';
import {
  ICursorConnectionConfig,
  IPaginationArgs,
  TOrder,
  TOperator,
  IPageInfo,
  IUser,
  IEdge,
  ICursorConnection,
} from '../utils/interfaces';
import { userData } from '../utils/mockData';


describe('cursorToKey', () => {
  it('should convert cursor to key', () => {
    const receivedValue = cursorToKey('c3RyaW5nIHRvIGJhc2U2NA==');
    const expectedValue = 'string to base64';
    expect(receivedValue).toEqual(expectedValue);
  });
});

describe('keyToCursor', () => {
  it('should convert key to cursor', () => {
    const receivedValue = keyToCursor('string to base64');
    const expectedValue = 'c3RyaW5nIHRvIGJhc2U2NA==';
    expect(receivedValue).toEqual(expectedValue);
  });
});

describe('emptyCursorConnection', () => {
  it('should represent em empty cursor connection', () => {
    const connection = emptyCursorConnection();
    expect(connection).toEqual({
      edges: [],
      pageInfo: {
        hasPreviousPage: false,
        hasNextPage: false,
      }
    });
  });
});

describe('paginationArgs', () => {
  describe('paginationArgs forwardPagination should return un object', () => {
    it('the limit attribute should be equal to argument first', () => {
      const args: IPaginationArgs = { first: 10 };
      const expectedLimit = 10;
      const pagination = paginationArgs(args);
      expect(pagination.limit).toEqual(expectedLimit);
    });

    it('the operator attribute should be the mongo operator greater than', () => {
      const args: IPaginationArgs = { first: 10 };
      const expectedOperator: TOperator = '>';
      const pagination = paginationArgs(args);
      expect(pagination.operator).toEqual(expectedOperator);
    });

    it('the key attribute should be a cursor when the argument "after" is provided', () => {
      const args: IPaginationArgs = { first: 10, after: 'OTU=' };
      const expectedKey = '95';
      const pagination = paginationArgs(args);
      expect(pagination.key).toEqual(expectedKey);
    });

    it('the order attribute should represent order by id in ascendent order', () => {
      const args: IPaginationArgs = { first: 10 };
      const expectedOrder: TOrder = 'ASC';
      const pagination = paginationArgs(args);
      expect(pagination.order).toEqual(expectedOrder);
    });
  });

  describe('paginationArgs backwardPagination should return un object', () => {
    it('the limit attribute should be equal to argument last', () => {
      const args: IPaginationArgs = { last: 10 };
      const expectedLimit = 10;
      const pagination = paginationArgs(args);
      expect(pagination.limit).toEqual(expectedLimit);
    });

    it('the operator attribute should be the mongo operator less than', () => {
      const args: IPaginationArgs = { last: 10 };
      const expectedOperator: TOperator = '<';
      const pagination = paginationArgs(args);
      expect(pagination.operator).toEqual(expectedOperator);
    });

    it('the key attribute should be a cursor when the argument before is provided', () => {
      const args: IPaginationArgs = { last: 10, before: 'OTY=' };
      const expectedKey = '96';
      const pagination = paginationArgs(args);
      expect(pagination.key).toEqual(expectedKey);
    });

    it('the order attribute should represent order by id in decendent order', () => {
      const args: IPaginationArgs = { last: 10 };
      const expectedOrder: TOrder = 'DESC';
      const pagination = paginationArgs(args);
      expect(pagination.order).toEqual(expectedOrder);
    });
  });
});


describe('getCursorConnection', () => {
  describe('getEdges', () => {
    it('should convert a list of itens to list of edges', () => {
      const items = [ userData ];
      const pageInfo: IPageInfo = { hasNextPage: false, hasPreviousPage: true, };
      const config: ICursorConnectionConfig<IUser> = { items, pageInfo };

      const { edges } = getCursorConnection(config);
      const expectedEdges: IEdge<IUser>[] = [{
        cursor: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNm',
        node: userData
      }];

      expect(edges).toEqual(expectedEdges);
    });
  });

  describe('getCursorConnection', () => {
    it('should return an empty cursor connection when an empty item list are provided', () => {
      const items: IUser[] = [];
      const pageInfo: IPageInfo = { hasNextPage: false, hasPreviousPage: true, };
      const config: ICursorConnectionConfig<IUser> = { items, pageInfo };

      const cursorConnection = getCursorConnection(config);
      const expectedCursorConnection: ICursorConnection<IUser> = emptyCursorConnection();

      expect(cursorConnection).toEqual(expectedCursorConnection);
    });

    it('should return valid cursor connection', () => {
      const items: IUser[] = [ userData ];
      const pageInfo: IPageInfo = {
        endCursor: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNm',
        hasNextPage: false,
        hasPreviousPage: false,
        startCursor: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNm',
      };
      const config: ICursorConnectionConfig<IUser> = { items, pageInfo };

      const cursorConnection = getCursorConnection(config);
      const expectedCursorConnection: ICursorConnection<IUser> = {
        pageInfo,
        edges: [{
          cursor: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNm',
          node: userData
        }]
      };

      expect(cursorConnection).toEqual(expectedCursorConnection);
    });
  });
});
