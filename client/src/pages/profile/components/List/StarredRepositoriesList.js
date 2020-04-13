import React from 'react';
import Button from '@material-ui/core/Button';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import RepositoryItem from '../Item/RepositoryItem';
import { edgesToArray } from 'utils/array';
import { getVariables, query } from '../UserNavigator/UserNavigator.relay';

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 1 auto',
  },
  actionContainer: {
    marginTop: '1rem',
    textAlign: 'center',
  }
}));

const StarredRepositoriesList = props => {
  const { relay, user } = props;
  const classes = useStyles();
  const repositories = edgesToArray(user.starredRepositories);

  const handleLoadMore = () => {
    if (relay.hasMore() === false || relay.isLoading() === true) return;
    relay.loadMore();
  };

  return (
    <div className={classes.root}>
      {repositories.map(repository => <RepositoryItem repository={repository} key={repository.id} />)}
      <div className={classes.actionContainer}>
        <Button onClick={handleLoadMore} disabled={relay.hasMore() === false}>
          {relay.hasMore() ? 'Load more' : 'No more repositories to show'}
        </Button>
      </div>
    </div>
  );
};

export default  createPaginationContainer(StarredRepositoriesList,
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
  { getVariables, query }
);
