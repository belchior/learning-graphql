import { gql } from '@apollo/client';


export const fragment = {
  repository: gql`
    fragment RepositoryItem_fragment_repository on Repository {
      description
      forkCount
      id
      licenseInfo {
        name
      }
      name
      owner {
        avatarUrl
        login
        url
      }
      primaryLanguage {
        color
        name
      }
      url
    }
  `
};


