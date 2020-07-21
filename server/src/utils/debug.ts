import bodyParser from 'body-parser';
import hash from 'object-hash';
import querystring from 'querystring';
import { intersection } from 'ramda';
import { Express, Request, Response } from 'express-serve-static-core';

import { DEBUG, SERVER_URL } from './environment';


type TDebugValues = {
  db: boolean
  query: boolean
}
type TPredicate<T> = (i: keyof T) => T[keyof T]


export const debugGraphqlQuery = (server: Express) => {
  const queryLog: { [key: string]: string } = {};

  server.use(bodyParser.json());

  server.use('/goto', function goto(req: Request, res: Response) {
    const id = req.query.id as string;
    if (!queryLog[id]) {
      console.error('Failed to find a stored query');
      return res.status(404).end();
    }
    return res.redirect(queryLog[id]);
  });

  server.use('/graphql', function graphql(req: Request, res: Response, next: Function) {
    const { query, variables } = req.body;
    const queryParams = querystring.stringify({
      query,
      variables: JSON.stringify(variables)
    });
    const id = hash({ query, variables });
    queryLog[id] = `${SERVER_URL}/graphql?${queryParams}`;
    console.log(`\x1b[35mGraphQL Query:\x1b[0m ${SERVER_URL}/goto?id=${id}`);
    next();
  });

  return server;
};

const toObject = <T>(predicate: TPredicate<T>, list: (keyof T)[]) => {
  const emptyObject = {} as T;

  return list.reduce(
    (obj, i) => {
      obj[i] = predicate(i);
      return obj;
    },
    emptyObject
  );
};

export const debugValues = (debug = DEBUG): TDebugValues => {
  const debugOptions = ['*', 'db', 'query'] as Array<keyof TDebugValues>;
  const debugValues = intersection(debugOptions, (debug || '').split(/[,\s]+/));
  if (debugValues.includes('*')) return toObject(() => true, debugOptions);
  return toObject(i => debugValues.includes(i), debugOptions);
};


const sanitizeSQL = (value: string) => value.replace(/[']+/, "''") // eslint-disable-line

const normalizeSQL = (value: unknown) => {
  if (Array.isArray(value)) return `'{${sanitizeSQL(String(value))}}'`;
  return sanitizeSQL(String(value));
};

const parseSQLQuery = (query: string, args?: unknown[]) => {
  if (!args || args.length === 0) return query;

  return args.reduce((acc: string, value, index) => {
    const reg = new RegExp(`\\$${index + 1}`, 'g');
    const normalizedValue = normalizeSQL(value);
    return acc.replace(reg, normalizedValue);
  }, query);
};

export const logQuery = (query: string, args?: unknown[]) => {
  console.log(parseSQLQuery(query, args));
};
