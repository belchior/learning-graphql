import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import { DATABASE_URL, CLIENT_URL, SERVER_URL, PORT, NODE_ENV } from './enviroment';
import { debugGraphqlQuery, debugValues } from './utils/debug';
import { schema } from './graphql/schema';


const graphqlHTTPOptions: graphqlHTTP.Options = {
  schema: schema,
  graphiql: NODE_ENV === 'development',
};
const connectionOptions: mongoose.ConnectionOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const debug = debugValues();

const startServer = () => {
  const server = express();

  if (NODE_ENV === 'development' && debug.query) debugGraphqlQuery(server);

  server.use(cors({ origin: CLIENT_URL }));
  server.use('/graphql', graphqlHTTP(graphqlHTTPOptions));
  server.listen(PORT, () => {
    console.log(`Running a GraphQL API server at ${SERVER_URL}/graphql`);
    console.log(`Accepting requests from ${CLIENT_URL}`);
  });
};

mongoose.set('debug', debug.db);
mongoose.connect(DATABASE_URL, connectionOptions);
mongoose.connection.once('open', startServer);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
