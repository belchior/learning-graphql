import { debugValues, logQuery } from './debug';

jest.mock('./environment');


describe('debugValues', () => {
  it('should math a pre-defined structure', () => {
    const debug = debugValues();
    const expectedValue = { '*': false, db: false, query: false };

    expect(debug).toEqual(expectedValue);
  });

  it('should return all attributes as true when a * is provided', () => {
    const debug = debugValues('*');
    expect(debug.db).toBe(true);
    expect(debug.query).toBe(true);
  });

  it('should return db true', () => {
    const debug = debugValues('db');
    expect(debug.db).toBe(true);
  });

  it('should return query true', () => {
    const debug = debugValues('query');
    expect(debug.query).toBe(true);
  });

  it('should return more the one attribute as true when provided', () => {
    const debug = debugValues('db, query');
    expect(debug.db).toBe(true);
    expect(debug.query).toBe(true);
  });
});

describe('logQuery', () => {
  it('should log a parsed query based on the arguments provided', () => {
    const log = console.log;
    console.log = jest.fn();

    const query = "SELECT * FROM users WHERE login = '$1'"; // eslint-disable-line
    const args = ['johndoe'];
    logQuery(query, args);

    const expectedQuery = "SELECT * FROM users WHERE login = 'johndoe'"; // eslint-disable-line

    expect(console.log).toHaveBeenCalledWith(expectedQuery);
    console.log = log;
  });

  it('should not change the provided query when there is no argument to replace', () => {
    const log = console.log;
    console.log = jest.fn();

    const query = 'SELECT * FROM organizations WHERE login = ANY($1)';
    const args: string[] = [];
    logQuery(query, args);


    expect(console.log).toHaveBeenCalledWith(query);
    console.log = log;
  });

  it('should log arrays in a postgres fashion', () => {
    const log = console.log;
    console.log = jest.fn();

    const query = 'SELECT * FROM organizations WHERE login = ANY($1)';
    const args = [['acme', 'company']];
    logQuery(query, args);

    const expectedQuery = 'SELECT * FROM organizations WHERE login = ANY(\'{acme,company}\')';

    expect(console.log).toHaveBeenCalledWith(expectedQuery);
    console.log = log;
  });
});

