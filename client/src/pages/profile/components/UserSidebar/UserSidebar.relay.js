import { graphql } from 'babel-plugin-relay/macro';

import { getVariables } from 'pages/profile/Profile.relay';


export const fragmentSpec = {
  profile: graphql`
    fragment UserSidebarRelay_profile on User
      @argumentDefinitions(
        count: { type: "Int", defaultValue: 5 }
        cursor: { type: "String" }
      ) {
      avatarUrl
      bio
      email
      login
      name
      websiteUrl
      organizations(first: $count after: $cursor)
        @connection(key: "UserSidebar_organizations") {
        edges {
          node {
            avatarUrl
            id
            login
            name
            url
          }
        }
      }
    }
  `
};

export const connectionConfig = {
  getVariables,
  query: graphql`
    query UserSidebarRelayQuery($cursor: String $login: String!) {
      profile(login: $login) {
        ...UserSidebarRelay_profile @arguments(cursor: $cursor)
      }
    }
  `
};
