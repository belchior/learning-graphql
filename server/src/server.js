import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import { DB_CONNECTION, DEBUG, NODE_ENV, ORIGIN, PORT } from './enviroment';
import { schema } from './schema';


const app = express();

const server = () => {
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: NODE_ENV === 'development',
  }));
  app.listen(PORT, () => {
    console.log(`Running a GraphQL API server at ${ORIGIN}`);
  });
};

const connectionOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.set('debug', DEBUG === 'db' || DEBUG === '*');
mongoose.connect(DB_CONNECTION, connectionOptions);
mongoose.connection.once('open', server);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
