import { Pool, QueryResult } from 'pg';
import { debugValues, logQuery } from './utils/debug';


const pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const find = <T>(query: string, args?: unknown[]): Promise<QueryResult<T>> => {
  const debug = debugValues();
  if (debug.db === true) logQuery(query, args);
  return pool.query(query, args);
};

export const connect = () => pool.connect();
