import React from 'react';
import { graphql } from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';

import List from './List';
import UserItem from 'pages/profile/components/Item/UserItem';
import { edgesToArray } from 'utils/array';
import { getVariables } from 'pages/profile/Profile.relay';
import { IRelay, IUser } from 'utils/interfaces';


interface IProps {
  relay: IRelay
  user: IUser
}

const FollowersList = (props: IProps) => {
  const { relay, user } = props;
  const followers = edgesToArray(user.followers || { edges: [] });

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
  {
    getVariables,
    query: graphql`
      query FollowersListQuery($cursor: String $login: String!) {
        user(login: $login) {
          ...FollowersList_user @arguments(cursor: $cursor)
        }
      }
    `
  }
);
