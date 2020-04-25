import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Mutation {
    addUserFollower(id: ID!, input: FollowerInput!): User
    createRepository(input: RepositoryInput!): Repository
    createUser(input: UserInput!): User
    removeUserFollower(id: ID!): User
    updateUserName(id: ID!, input: String!): User
  }

  input FollowerInput {
    id: ID
    login: String
  }

  input LicenseInput {
    name: String
  }

  input LanguageInput {
    color: String
    name: String
  }

  input RepositoryInput {
    description: String
    forkCount: Int
    licenseInfo: LicenseInput
    name: String
    ownerLogin: String
    primaryLanguage: LanguageInput
    url: String
  }

  input UserInput {
    avatarUrl: String
    bio: String
    company: String
    email: String
    location: String
    login: String
    name: String
    url: String
    websiteUrl: String
  }
`;
