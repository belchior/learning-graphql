
import {
  arrayIndexPagination,
  parseKey,
  valuesToCursorConnection,
} from './indexPagination';


describe('Cursor connection Index Pagination', () => {
  describe('parseKey', () => {
    it('should parse a valid key without crash', () => {
      const key = '0|-1';
      const receivedKeys = parseKey(key);
      const expectedKeys = { after: 0, before: -1 };
      expect(receivedKeys).toEqual(expectedKeys);
    });

    it('should throw an error when argument key is invalid', () => {
      const key = 'MHwtMQ=='; // this is a cursor not a key
      const error = new Error(`Unable to parse key: ${key}`);
      expect(() => parseKey(key)).toThrow(error);
    });
  });

  describe('arrayIndexPagination', () => {
    /*
      forward pagination argument
      first = 3
      after = 2
      returned = [02, 03, 04]

                2             3
                |`````````````|
      |----|----|----|----|----|----|----|----|----|----
      | 00 | 01 | 02 | 03 | 04 | 05 | 06 | 07 | 08 | 09
      |----|----|----|----|----|----|----|----|----|----
                               |,,,,,,,,,,,,,|
                              -5             3

      backward pagination argument
      last   = 3
      before = 2 (-last - before = -5)
      returned = [05, 06, 07]
    */

    it('should return un object containing skip and limit as attributes', () => {
      const args = { first: 10 };
      const receivedValue = arrayIndexPagination(args);
      const expectedValue = { skip: 0, limit: 10 };
      expect(receivedValue).toEqual(expectedValue);
    });

    it('when a forward pagination arguments is provided the skip attribute should be zero or positive integer', () => {
      let args = { first: 10 };
      let receivedSkip = arrayIndexPagination(args).skip;
      let expectedSkip = 0;
      expect(receivedSkip).toEqual(expectedSkip);

      args = { first: 10, after: 'MHwtMjA=' };
      receivedSkip = arrayIndexPagination(args).skip;
      expectedSkip = 1;
      expect(receivedSkip).toEqual(expectedSkip);
    });

    it('when a forward pagination arguments is provided the limit attribute should be positive integer', () => {
      let args = { first: 10 };
      let receivedLimit = arrayIndexPagination(args).limit;
      let expectedLimit = 10;
      expect(receivedLimit).toEqual(expectedLimit);

      args = { first: 10, after: 'MHwtMjA=' };
      receivedLimit = arrayIndexPagination(args).limit;
      expectedLimit = 10;
      expect(receivedLimit).toEqual(expectedLimit);
    });

    it('when a backward pagination arguments is provided the skip attribute should be negative integer', () => {
      let args = { last: 5 };
      let receivedSkip = arrayIndexPagination(args).skip;
      let expectedSkip = -5;
      expect(receivedSkip).toEqual(expectedSkip);

      args = { last: 5, before: 'MTl8LTE=' };
      receivedSkip = arrayIndexPagination(args).skip;
      expectedSkip = -6;
      expect(receivedSkip).toEqual(expectedSkip);
    });

    it('when a backward pagination arguments is provided the limit attribute should be positive integer', () => {
      let args = { last: 5 };
      let receivedLimit = arrayIndexPagination(args).limit;
      let expectedLimit = 5;
      expect(receivedLimit).toEqual(expectedLimit);

      args = { last: 5, before: 'MTl8LTE=' };
      receivedLimit = arrayIndexPagination(args).limit;
      expectedLimit = 5;
      expect(receivedLimit).toEqual(expectedLimit);
    });
  });

  describe('valuesToCursorConnection', () => {
    it('should return an empty cursor connection when are null or empty', () => {
      let values = undefined;
      const args = { first: 10 };
      let receivedConnection = valuesToCursorConnection(values, args);
      const expectedConnection = {
        edges: [],
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
        }
      };
      expect(receivedConnection).toEqual(expectedConnection);

      values = [];
      receivedConnection = valuesToCursorConnection(values, args);
      expect(receivedConnection).toEqual(expectedConnection);
    });

    it('should return a valid cursor connection when a forward pagination argument is provided', () => {
      const values = [
        { key: '0|-1', totalItems: 1, name: 'item 1' },
      ];
      const args = { first: 10 };
      const receivedConnection = valuesToCursorConnection(values, args);
      const expectedConnection = {
        edges: [
          { cursor: 'MHwtMQ==', node: { ...values[0] } },
        ],
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
        }
      };
      expect(receivedConnection).toEqual(expectedConnection);
    });

    it('should return a valid cursor connection when a backward pagination argument is provided', () => {
      const args = { last: 5 };
      let values = [
        { key: '0|-1', totalItems: 1, name: 'item 1' },
      ];
      let receivedConnection = valuesToCursorConnection(values, args);
      let expectedConnection = {
        edges: [
          { cursor: 'MHwtMQ==', node: values[0] },
        ],
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: false,
        }
      };
      expect(receivedConnection).toEqual(expectedConnection);

      values = [
        { key: '0|-23', totalItems: 23, name: 'item 1' },
      ];
      receivedConnection = valuesToCursorConnection(values, args);
      expectedConnection = {
        edges: [
          { cursor: 'MHwtMjM=', node: values[0] },
        ],
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: true,
        }
      };
      expect(receivedConnection).toEqual(expectedConnection);
    });
  });
});