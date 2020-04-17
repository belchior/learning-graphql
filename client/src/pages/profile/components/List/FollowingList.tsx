import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createPaginationContainer } from 'react-relay';

import List from './List';
import UserItem from '../Item/UserItem';
import { edgesToArray } from 'utils/array';
import { getVariables } from 'pages/profile/Profile.relay';
import { IRelay, IUser } from 'utils/interfaces';


interface IProps {
  relay: IRelay
  user: IUser
}

const FollowingList = (props: IProps) => {
  const { relay, user } = props;
  const following = edgesToArray(user.following);

  return (
    <List relay={relay}>
      {following.map(user => <UserItem user={user} key={user.id} />)}
    </List>
  );
};

export default createPaginationContainer(
  FollowingList,
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
  {
    getVariables,
    query: graphql`
      query FollowingListQuery($cursor: String $login: String!) {
        user(login: $login) {
          ...FollowingList_user @arguments(cursor: $cursor)
        }
      }
    `
  }
);
