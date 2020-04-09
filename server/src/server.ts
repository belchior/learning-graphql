import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import { DATABASE_URL, CLIENT_URL, SERVER_URL, PORT, NODE_ENV } from './enviroment';
import { schema } from './graphql/schema';
import { debugGraphqlQuery, debugValues } from './utils/debug';

const debug = debugValues();
const app = express();

const startServer = () => {
  if (NODE_ENV === 'development' && debug.query) debugGraphqlQuery(app);

  app.use(cors({ origin: CLIENT_URL }));
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: NODE_ENV === 'development',
  }));
  app.use('/', (req, res) => {
    res.json({ status: 'running' });
  });
  app.listen(PORT, () => {
    console.log(`Running a GraphQL API server at ${SERVER_URL}/graphql`);
    console.log(`Accepting requests from ${CLIENT_URL}`);
  });
};

const connectionOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.set('debug', debug.db);
mongoose.connect(DATABASE_URL, connectionOptions);
mongoose.connection.once('open', startServer);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
