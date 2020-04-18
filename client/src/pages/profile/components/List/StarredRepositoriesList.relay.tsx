import { graphql } from 'babel-plugin-relay/macro';

import { getVariables } from 'pages/profile/Profile.relay';


export const fragmentSpec = {
  user: graphql`
    fragment StarredRepositoriesListRelay_user on User
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
      starredRepositories(first: $count after: $cursor)
        @connection(key: "StarredRepositoriesList_starredRepositories") {
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
    query StarredRepositoriesListRelayQuery($cursor: String $login: String!) {
      user(login: $login) {
        ...StarredRepositoriesListRelay_user @arguments(cursor: $cursor)
      }
    }
  `
};
