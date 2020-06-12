import { graphql } from 'babel-plugin-relay/macro';


export const fragmentSpec = {
  profile: graphql`
    fragment OrganizationHeaderRelay_profile on Organization {
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
