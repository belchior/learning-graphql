import { gql } from '@apollo/client';

export const fragment = {
  profile: gql`
    fragment UserSidebar_fragment_profile on User {
      avatarUrl
      bio
      email
      login
      name
      websiteUrl
      organizations(first: 20) {
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

