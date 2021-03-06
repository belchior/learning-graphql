import cors from 'cors';
import express from 'express';
import { graphqlHTTP, Options } from 'express-graphql';
import { PoolClient } from 'pg';

import { CLIENT_URL, NODE_ENV, SERVER_PORT, SERVER_URL } from './utils/environment';
import { connect as dbConnect } from './db';
import { createLoaders } from './graphql/loaders';
import { debugGraphqlQuery, debugValues } from './utils/debug';
import { schema } from './graphql/schema';


const server = express();
const debug = debugValues();

const startServer = (client: PoolClient) => {
  client.release();
  if (NODE_ENV === 'development' && debug.query) debugGraphqlQuery(server);

  server.disable('x-powered-by');
  server.use(cors({ methods: 'GET,POST', origin: CLIENT_URL, }));

  server.use('/graphql', graphqlHTTP(() => {
    const graphqlHTTPOptions: Options = {
      schema: schema,
      graphiql: NODE_ENV === 'development',
      context: {
        loader: createLoaders(),
      },
    };
    return graphqlHTTPOptions;
  }));

  server.listen(SERVER_PORT, () => {
    console.log(`Running a GraphQL API server at ${SERVER_URL}/graphql`);
    console.log(`Accepting requests from ${CLIENT_URL}`);
  });
};

dbConnect()
  .then(startServer)
  .catch(console.error);
