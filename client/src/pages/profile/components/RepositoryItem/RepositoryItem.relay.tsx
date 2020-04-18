import { graphql } from 'babel-plugin-relay/macro';


export const fragmentSpec = {
  repository: graphql`
    fragment RepositoryItemRelay_repository on Repository {
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


