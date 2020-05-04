import { gql } from '@apollo/client';


export const fragment = {
  profile: gql`
    fragment OrganizationHeader_fragment_profile on Organization {
      avatarUrl
      description
      location
      login
      name
      url
      websiteUrl
    }
  `
};
