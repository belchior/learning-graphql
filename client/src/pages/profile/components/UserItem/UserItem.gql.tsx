import { gql } from '@apollo/client';


export const fragment = {
  user: gql`
    fragment UserItem_fragment_user on User {
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
