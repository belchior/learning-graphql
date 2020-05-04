import { ApolloClient, HttpLink, InMemoryCache, ApolloClientOptions } from '@apollo/client';


const ENDPOINT = process.env.REACT_APP_SERVER_URL;

const options: ApolloClientOptions<{}> = {
  cache: new InMemoryCache(),
  link: new HttpLink({ uri: `${ENDPOINT}/graphql` }),
  connectToDevTools: false,
};

export const client = new ApolloClient(options);
