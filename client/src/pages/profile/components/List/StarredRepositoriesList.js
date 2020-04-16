import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';

import List from './List';
import RepositoryItem from '../Item/RepositoryItem';
import { edgesToArray } from 'utils/array';
import { getVariables } from 'pages/profile/Profile.relay';


const StarredRepositoriesList = props => {
  const { relay, user } = props;
  const repositories = edgesToArray(user.starredRepositories);

  return (
    <List relay={relay}>
      {repositories.map(repository => <RepositoryItem repository={repository} key={repository.id} />)}
    </List>
  );
};

export default createPaginationContainer(StarredRepositoriesList,
  {
    user: graphql`
      fragment StarredRepositoriesList_user on User
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 5 }
          cursor: { type: "String" }
        ) {
        starredRepositories(first: $count after: $cursor)
          @connection(key: "StarredRepositoriesList_starredRepositories") {
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
      query StarredRepositoriesListQuery($cursor: String $login: String!) {
        user(login: $login) {
          ...StarredRepositoriesList_user @arguments(cursor: $cursor)
        }
      }
    `
  }
);
