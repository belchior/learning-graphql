import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';

import List from './List';
import RepositoryItem from '../Item/RepositoryItem';
import { edgesToArray } from 'utils/array';
import { getVariables } from 'pages/profile/Profile.relay';


const RepositoriesList = props => {
  const { relay, owner } = props;
  const repositories = edgesToArray(owner.repositories);

  return (
    <List relay={relay}>
      {repositories.map(repository => <RepositoryItem repository={repository} key={repository.id} />)}
    </List>
  );
};

export default createPaginationContainer(RepositoriesList,
  {
    owner: graphql`
      fragment RepositoriesList_owner on RepositoryOwner
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 5 }
          cursor: { type: "String" }
        ) {
        repositories(first: $count after: $cursor) @connection(key: "RepositoriesList_repositories") {
          edges {
            node {
              id
              ...RepositoryItem_repository
            }
          }
        }
      }
    `
  },
  {
    getVariables,
    query: graphql`
      query RepositoriesListQuery($cursor: String $login: String!) {
        profile(login: $login) {
          ...RepositoriesList_owner @arguments(cursor: $cursor)
        }
      }
    `
  }
);
