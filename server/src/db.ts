import { Pool, QueryConfig, QueryResult } from 'pg';


const pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const find = <T>(query: string | QueryConfig, args?: unknown[]): Promise<QueryResult<T>> => {
  return pool.query(query, args);
};

export const connect = () => pool.connect();
