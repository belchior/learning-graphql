import { graphql } from 'babel-plugin-relay/macro';

import { getVariables } from 'pages/profile/Profile.relay';


export const fragmentSpec = {
  user: graphql`
    fragment FollowingListRelay_user on User
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
      following(first: $count after: $cursor)
        @connection(key: "FollowingList_following") {
        edges {
          node {
            id
            ...UserItemRelay_user
          }
        }
      }
    }
  `
};

export const connectionConfig = {
  getVariables,
  query: graphql`
    query FollowingListRelayQuery($cursor: String $login: String!) {
      user(login: $login) {
        ...FollowingListRelay_user @arguments(cursor: $cursor)
      }
    }
  `
};
