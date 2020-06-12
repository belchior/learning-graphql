import { Environment, Network, RecordSource, Store, } from 'relay-runtime';

const endpoint = process.env.REACT_APP_SERVER_URL || '';

const fetchQuery = async (operation: { text: string }, variables: object) => {
  return fetch(`${endpoint}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => response.json());
};

export const environment = new Environment({
  // @ts-ignore
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});
