import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';

import List from './List';
import UserItem from '../Item/UserItem';
import { edgesToArray } from 'utils/array';
import { connectionConfig } from '../UserNavigator/UserNavigator.relay';


const FollowersList = props => {
  const { relay, user } = props;
  const followers = edgesToArray(user.followers);

  return (
    <List relay={relay}>
      { followers.map(user => <UserItem user={user} key={user.id} />) }
    </List>
  );
};

export default createPaginationContainer(
  FollowersList,
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
  connectionConfig
);
