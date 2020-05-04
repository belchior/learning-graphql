import { gql } from '@apollo/client';

import * as RepositoryItem from '../RepositoryItem/RepositoryItem.gql';

export const fragment = {
  user: gql`
    fragment StarredRepositoriesList_fragment_user on User {
      starredRepositories(first: 10) @connection(key: "StarredRepositoriesList_starredRepositories") {
        edges {
          node {
            id
            ...RepositoryItem_fragment_repository
          }
        }
      }
    }

    ${RepositoryItem.fragment.repository}
  `
};
