import React from 'react';
import Button from '@material-ui/core/Button';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';
import { makeStyles } from '@material-ui/core/styles';

import UserItem from '../Item/UserItem';
import { edgesToArray } from 'utils/array';
import { getVariables, query } from '../UserNavigator/UserNavigator.relay';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flex: '1 1 auto',
  },
  actionContainer: {
    marginTop: '1rem',
    textAlign: 'center',
  }
}));

const FollowersList = props => {
  const { relay, user } = props;
  const classes = useStyles();
  const followers = edgesToArray(user.followers);

  const disabled = relay.hasMore() === false;
  const text = relay.hasMore() ? 'Load more' : 'No more followers to show';

  const handleLoadMore = () => {
    if (relay.hasMore() === false || relay.isLoading() === true) return;
    relay.loadMore();
  };

  return (
    <div className={classes.root}>
      { followers.length === 0
        ? <Typography>No more items to load</Typography>
        : (
          <React.Fragment>
            { followers.map(user => <UserItem user={user} key={user.id} />) }
            <div className={classes.actionContainer}>
              <Button
                onClick={handleLoadMore}
                disabled={disabled}
              >
                {text}
              </Button>
            </div>
          </React.Fragment>
        )
      }
    </div>
  );
};

export default  createPaginationContainer(FollowersList,
  {
    user: graphql`
      fragment FollowersList_user on User
        @argumentDefinitions(
          count: { type: "Int", defaultValue: 5 }
          cursor: { type: "String" }
        ) {
        followers(first: $count after: $cursor)
          @connection(key: "FollowersList_followers") {
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
