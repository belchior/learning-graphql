import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, ApolloServerExpressConfig } from 'apollo-server-express';

import { DATABASE_URL, CLIENT_URL, SERVER_URL, PORT, NODE_ENV } from './enviroment';
import { debugValues, debugGraphqlQuery } from './utils/debug';
import { resolvers, typeDefs } from './apollo/schema';


const apolloServerConfig: ApolloServerExpressConfig = {
  resolvers,
  typeDefs,
  tracing: NODE_ENV === 'development',
};
const mongooseConfig = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
const debug = debugValues();

const startServer = () => {
  const server = express();
  const apollo = new ApolloServer(apolloServerConfig);

  if (NODE_ENV === 'development' && debug.query) debugGraphqlQuery(server);

  server.use(cors({ origin: CLIENT_URL }));
  apollo.applyMiddleware({ app: server });

  server.listen(PORT, () => {
    console.log(`Running a GraphQL API server at ${SERVER_URL}/graphql`);
    console.log(`Accepting requests from ${CLIENT_URL}`);
  });
};

mongoose.set('debug', debug.db);
mongoose.connect(DATABASE_URL, mongooseConfig);
mongoose.connection.once('open', startServer);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
