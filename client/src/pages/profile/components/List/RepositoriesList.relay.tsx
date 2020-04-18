import { graphql } from 'babel-plugin-relay/macro';

import { getVariables } from 'pages/profile/Profile.relay';


export const fragmentSpec = {
  owner: graphql`
    fragment RepositoriesListRelay_owner on RepositoryOwner
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
      repositories(first: $count after: $cursor) @connection(key: "RepositoriesList_repositories") {
        edges {
          node {
            id
            ...RepositoryItemRelay_repository
          }
        }
      }
    }
  `
};

export const connectionConfig = {
  getVariables,
  query: graphql`
    query RepositoriesListRelayQuery($cursor: String $login: String!) {
      profile(login: $login) {
        ...RepositoriesListRelay_owner @arguments(cursor: $cursor)
      }
    }
  `
};
