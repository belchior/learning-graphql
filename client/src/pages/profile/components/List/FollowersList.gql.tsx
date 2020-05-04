import { gql } from '@apollo/client';

import * as UserItem from '../UserItem/UserItem.gql';


export const fragment = {
  user: gql`
    fragment FollowersList_fragment_user on User {
      id
      followers(first: 10) @connection(key: "FollowersList_followers") {
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
