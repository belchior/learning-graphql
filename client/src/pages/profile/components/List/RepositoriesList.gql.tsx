import { gql } from '@apollo/client';

import * as RepositoryItem from '../RepositoryItem/RepositoryItem.gql';

export const fragment = {
  owner: gql`
    fragment RepositoriesList_fragment_owner on RepositoryOwner {
      repositories(first: 10) @connection(key: "RepositoriesList_repositories") {
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
