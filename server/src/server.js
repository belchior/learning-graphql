import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import { DB_CONNECTION, DEBUG, FRONTEND_ORIGIN, NODE_ENV, ORIGIN, PORT } from './enviroment';
import { schema } from './schema';


const app = express();

const startServer = () => {
  app.use(cors({ origin: FRONTEND_ORIGIN }));
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: NODE_ENV === 'development',
  }));
  app.listen(PORT, () => {
    console.log(`Running a GraphQL API server at ${ORIGIN}/graphql`);
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
mongoose.connection.once('open', startServer);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
