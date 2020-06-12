import bodyParser from 'body-parser';
import hash from 'object-hash';
import querystring from 'querystring';
import { intersection } from 'ramda';

import { DEBUG, SERVER_URL } from '../environment';


export const debugGraphqlQuery = (server) => {
  const queryLog = {};

  server.use(bodyParser.json());

  server.use('/goto', (req, res) => {
    const { id } = req.query;
    if (!queryLog[id]) {
      console.error('Failed to find a stored query');
      return res.status(404).end();
    }
    return res.redirect(queryLog[id]);
  });

  server.use('/graphql', (req, res, next) => {
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

const toObject = (list, predicate) => {
  return list.reduce((obj, i) => {
    obj[i] = predicate(i);
    return obj;
  }, {});
};

const debugOptions = ['*', 'db', 'query'];

export const debugValues = () => {
  const debugValues = intersection(debugOptions, (DEBUG || '').split(/[,\s]+/));
  if (debugValues.includes('*')) return toObject(debugOptions, () => true);
  return toObject(debugOptions, i => debugValues.includes(i));
};
