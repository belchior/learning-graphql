import bodyParser from 'body-parser';
import hash from 'object-hash';
import querystring from 'querystring';
import { intersection } from 'ramda';

import { DEBUG, SERVER_URL } from '../enviroment';


type TDebugMap = {
  [key: string]: boolean
}
type TPredicate = (i: string) => boolean


export const debugGraphqlQuery = (app: any) => {
  const queryLog: any = {};

  app.use(bodyParser.json());

  app.use('/goto', (req: any, res: any) => {
    const { id } = req.query;
    if (!queryLog[id]) {
      console.error('Failed to find a stored query');
      return res.status(404).end();
    }
    return res.redirect(queryLog[id]);
  });

  app.use('/graphql', (req: any, res: any, next: Function) => {
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

  return app;
};

const toObject = (list: string[], predicate: TPredicate) => {
  return list.reduce((obj: TDebugMap, i) => {
    obj[i] = predicate(i);
    return obj;
  }, {});
};

const debugOptions = ['*', 'db', 'graphiql', 'query'];

export const debugValues = () => {
  const debugValues = intersection(debugOptions, (DEBUG || '').split(/[,\s]+/));
  if (debugValues.includes('*')) return toObject(debugOptions, () => true);
  return toObject(debugOptions, i => debugValues.includes(i));
};
