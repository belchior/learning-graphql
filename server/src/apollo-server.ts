import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from 'apollo-server-express';

import { DATABASE_URL, CLIENT_URL, SERVER_URL, PORT, NODE_ENV } from './enviroment';
import { debugValues, debugGraphqlQuery } from './utils/debug';
import { resolvers, typeDefs } from './apollo/schema';


const apolloServerConfig = {
  cors: { origin: CLIENT_URL },
  resolvers,
  typeDefs,
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

  if (NODE_ENV === 'development' && debug.query) debugGraphqlQuery(server);

  const apollo = new ApolloServer(apolloServerConfig);
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
