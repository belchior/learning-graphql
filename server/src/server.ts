import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import { Pool, PoolClient } from 'pg';

import { CLIENT_URL, SERVER_URL, PORT, NODE_ENV } from './environment';
import { createLoaders } from './entities/loaders';
import { debugGraphqlQuery, debugValues } from './utils/debug';
import { schema } from './graphql/schema';

const server = express();
const debug = debugValues();
const postgres = new Pool();


const startServer = (client: PoolClient) => {
  if (NODE_ENV === 'development' && debug.query) debugGraphqlQuery(server);

  server.use(cors({ origin: CLIENT_URL }));
  server.use('/graphql', graphqlHTTP(() => {
    const graphqlHTTPOptions: graphqlHTTP.Options = {
      schema: schema,
      graphiql: NODE_ENV === 'development',
      context: {
        loader: createLoaders(),
        dbClient: client,
      },
    };
    return graphqlHTTPOptions;
  }));
  server.listen(PORT, () => {
    console.log(`Running a GraphQL API server at ${SERVER_URL}/graphql`);
    console.log(`Accepting requests from ${CLIENT_URL}`);
  });
};

postgres.connect()
  .then(startServer)
  .catch(console.error);
