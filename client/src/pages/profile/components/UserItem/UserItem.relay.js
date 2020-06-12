import { graphql } from 'babel-plugin-relay/macro';


export const fragmentSpec = {
  user: graphql`
    fragment UserItemRelay_user on User {
      avatarUrl
      bio
      company
      location
      login
      name
      url
    }
  `
};
