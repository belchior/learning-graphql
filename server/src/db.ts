import { Pool, QueryConfig, QueryResult } from 'pg';


const pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});
pool.on('connect', () => {
  console.error('Postgres connected');
});
pool.on('acquire', () => {
  console.error('Postgres acquire');
});

export const find = <T>(query: string | QueryConfig, args?: any[]): Promise<QueryResult<T>> => {
  return pool.query(query, args);
};

export const connect = () => pool.connect();
