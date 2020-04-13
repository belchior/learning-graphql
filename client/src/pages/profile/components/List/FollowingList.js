import React from 'react';
import Button from '@material-ui/core/Button';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import UserItem from '../Item/UserItem';
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

const FollowingList = props => {
  const { relay, user } = props;
  const classes = useStyles();
  const following = edgesToArray(user.following);

  const handleLoadMore = () => {
    if (relay.hasMore() === false || relay.isLoading() === true) return;
    relay.loadMore();
  };

  return (
    <div className={classes.root}>
      {following.map(user => <UserItem user={user} key={user.id} />)}
      <div className={classes.actionContainer}>
        <Button onClick={handleLoadMore} disabled={relay.hasMore() === false}>
          {relay.hasMore() ? 'Load more' : 'No more following to show'}
        </Button>
      </div>
    </div>
  );
};

export default  createPaginationContainer(FollowingList,
  {
    user: graphql`
      fragment FollowingList_user on User
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 5 }
          cursor: { type: "String" }
        ) {
        following(first: $count after: $cursor)
          @connection(key: "FollowingList_following") {
          edges {
            node {
              id
              ...UserItem_user
            }
          }
        }
      }
    `
  },
  { getVariables, query }
);
