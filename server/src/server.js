import cors from 'cors';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';

import { DATABASE_URL, DEBUG, CLIENT_URL, NODE_ENV, SERVER_URL, PORT } from './enviroment';
import { schema } from './schema';


const app = express();

const startServer = () => {
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
  });
};

const connectionOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.set('debug', DEBUG === 'db' || DEBUG === '*');
mongoose.connect(DATABASE_URL, connectionOptions);
mongoose.connection.once('open', startServer);
mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
