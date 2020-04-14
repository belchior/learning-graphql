import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';

import List from './List';
import RepositoryItem from '../Item/RepositoryItem';
import { edgesToArray } from 'utils/array';
import { connectionConfig } from '../UserNavigator/UserNavigator.relay';


const RepositoriesList = props => {
  const { relay, user } = props;
  const repositories = edgesToArray(user.repositories);

  return (
    <List relay={relay}>
      {repositories.map(repository => <RepositoryItem repository={repository} key={repository.id} />)}
    </List>
  );
};

export default createPaginationContainer(RepositoriesList,
  {
    user: graphql`
      fragment RepositoriesList_user on User
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
  connectionConfig
);
