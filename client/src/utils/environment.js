import { Environment, Network, RecordSource, Store, } from 'relay-runtime';

const endpoint = 'http://localhost:4000';

const fetchQuery = (operation, variables) => {
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
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});
