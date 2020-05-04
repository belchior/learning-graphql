import { gql } from '@apollo/client';

import * as UserItem from '../UserItem/UserItem.gql';


export const fragment = {
  user: gql`
    fragment FollowingList_fragment_user on User {
      following(first: 10) @connection(key: "FollowingList_following") {
        edges {
          node {
            id
            ...UserItem_fragment_user
          }
        }
      }
    }

    ${UserItem.fragment.user}
  `
};
