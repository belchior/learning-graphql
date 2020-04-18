import { graphql } from 'babel-plugin-relay/macro';

import { getVariables } from 'pages/profile/Profile.relay';


export const fragmentSpec = {
  user: graphql`
    fragment FollowersListRelay_user on User
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
      followers(first: $count after: $cursor)
        @connection(key: "FollowersList_followers") {
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
    query FollowersListRelayQuery($cursor: String $login: String!) {
      user(login: $login) {
        ...FollowersListRelay_user @arguments(cursor: $cursor)
      }
    }
  `
};
