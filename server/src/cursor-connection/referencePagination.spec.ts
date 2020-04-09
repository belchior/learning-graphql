import mongoose from 'mongoose';

import {
  cursorToKey,
  emptyCursorConnection,
  itemsToCursorConnection,
  keyToCursor,
  paginationArgs,
} from './referencePagination';
import { IPaginationArgs, IPageInfo } from '../graphql/interfaces';
import { User as UserModel } from '../entities/user/model';
import { userData } from '../utils/mockData';

jest.mock('../entities/user/model');


describe('cursorToKey', () => {
  it('should receive base64 string as cursor and return mongodb ObjectId', () => {
    const cursor = 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNl';
    const expectedKey = mongoose.Types.ObjectId('5e5580d6f72291487ec648ce');
    const receivedKey = cursorToKey(cursor);
    expect(receivedKey).toEqual(expectedKey);
  });
});

describe('keyToCursor', () => {
  it('should receive mongodb ObjectId as key and return base64 string', () => {
    const key = mongoose.Types.ObjectId('5e5580d6f72291487ec648ce');
    const expectedCursor = 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNl';
    const receivedCursor = keyToCursor(key);
    expect(receivedCursor).toEqual(expectedCursor);
  });
});

describe('paginationArgs forwardPagination should return un object', () => {
  it('the limit attribute should be equal to argument first', () => {
    const args = { first: 10 };
    const expectedLimit = 10;
    const pagination = paginationArgs(args);
    expect(pagination.limit).toEqual(expectedLimit);
  });

  it('the operator attribute should be the mongo operator greater than', () => {
    const args = { first: 10 };
    const expectedOperator = '$gt';
    const pagination = paginationArgs(args);
    expect(pagination.operator).toEqual(expectedOperator);
  });

  it('the key attribute should be a cursor when the argument "after" is provided', () => {
    const args = { first: 10, after: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNl' };
    const expectedKey = mongoose.Types.ObjectId('5e5580d6f72291487ec648ce');
    const pagination = paginationArgs(args);
    expect(pagination.key).toEqual(expectedKey);
  });

  it('the sort attribute should represent sort by id in ascendent order', () => {
    const args = { first: 10 };
    const expectedSort = { _id: 1 };
    const pagination = paginationArgs(args);
    expect(pagination.sort).toEqual(expectedSort);
  });
});

describe('paginationArgs backwardPagination should return un object', () => {
  it('the limit attribute should be equal to argument last', () => {
    const args = { last: 10 };
    const expectedLimit = 10;
    const pagination = paginationArgs(args);
    expect(pagination.limit).toEqual(expectedLimit);
  });

  it('the operator attribute should be the mongo operator less than', () => {
    const args = { last: 10 };
    const expectedOperator = '$lt';
    const pagination = paginationArgs(args);
    expect(pagination.operator).toEqual(expectedOperator);
  });

  it('the key attribute should be a cursor when the argument before is provided', () => {
    const args = { last: 10, before: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNl' };
    const expectedKey = mongoose.Types.ObjectId('5e5580d6f72291487ec648ce');
    const pagination = paginationArgs(args);
    expect(pagination.key).toEqual(expectedKey);
  });

  it('the sort attribute should represent sort by id in decendent order', () => {
    const args = { last: 10 };
    const expectedSort = { _id: -1 };
    const pagination = paginationArgs(args);
    expect(pagination.sort).toEqual(expectedSort);
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

describe('itemsToCursorConnection', () => {
  it('should return a valid connection structure when forward pagination is provided', async () => {
    const pageInfo: IPageInfo = {
      endCursor: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNm',
      hasPreviousPage: true,
      hasNextPage: false,
      startCursor: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNm',
    };
    (UserModel.aggregate as jest.Mock).mockImplementation(() => Promise.resolve([pageInfo]));

    const args: IPaginationArgs = { first: 10 };
    const items = [userData];
    const greaterThanStages = [{ $match: { _id: { $gt: '5e5580d6f72291487ec648ce' } } }];
    const lessThanStages = [{ $match: { _id: { $lt: '5e5580d6f72291487ec648ce' } } }];
    const config = {
      Model: UserModel,
      args,
      items,
      greaterThanStages,
      lessThanStages
    };

    const expectedConnection = {
      edges: [
        { cursor: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNm', node: items[0] }
      ],
      pageInfo: pageInfo,
    };
    // @ts-ignore
    const receivedConnection = await itemsToCursorConnection(config);

    expect(receivedConnection).toEqual(expectedConnection);
  });

  it('should return a valid connection structure when backward pagination is provided', async () => {
    const pageInfo: IPageInfo = {
      endCursor: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNm',
      hasNextPage: true,
      hasPreviousPage: false,
      startCursor: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNm',
    };
    (UserModel.aggregate as jest.Mock).mockImplementation(() => Promise.resolve([pageInfo]));
    const args: IPaginationArgs = { last: 10 };
    const items = [userData];
    const greaterThanStages = [{ $match: { _id: { $gt: '5e5580d6f72291487ec648cf' } } }];
    const lessThanStages = [{ $match: { _id: { $lt: '5e5580d6f72291487ec648cf' } } }];
    const config = {
      Model: UserModel,
      args,
      items,
      greaterThanStages,
      lessThanStages
    };

    const expectedConnection = {
      edges: [
        { cursor: 'NWU1NTgwZDZmNzIyOTE0ODdlYzY0OGNm', node: items[0] }
      ],
      pageInfo
    };
    // @ts-ignore
    const receivedConnection = await itemsToCursorConnection(config);

    expect(receivedConnection).toEqual(expectedConnection);
  });
});
