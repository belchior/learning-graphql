import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Language {
    color: String
    name: String
  }

  type License {
    name: String
  }

  interface Node {
    id: ID!
  }

  type OrganizationConnection {
    edges: [OrganizationEdge]!
    pageInfo: PageInfo!
  }

  type OrganizationEdge {
    cursor: String!
    node: Organization
  }

  type Organization implements Node & ProfileOwner & RepositoryOwner {
    avatarUrl: String!
    description: String
    email: String
    id: ID!
    location: String
    login: String!
    name: String
    people(after: String, before: String, first: Int, last: Int): UserConnection!
    repositories(after: String, before: String, first: Int, last: Int): RepositoryConnection!
    url: String!
    websiteUrl: String
  }

  type PageInfo {
    endCursor: String
    hasNextPage: Boolean!
    hasPreviousPage: Boolean!
    startCursor: String
  }

  interface ProfileOwner {
    id: ID!
    login: String!
  }

  interface RepositoryOwner {
    avatarUrl: String!
    id: ID!
    login: String!
    name: String
    repositories(after: String, before: String, first: Int, last: Int): RepositoryConnection!
    url: String!
  }

  type RepositoryConnection {
    edges: [RepositoryEdge]!
    pageInfo: PageInfo!
  }

  type RepositoryEdge {
    cursor: String!
    node: Repository
  }

  type Repository implements Node {
    description: String
    forkCount: Int
    id: ID!
    licenseInfo: License
    name: String!
    owner: RepositoryOwner!
    primaryLanguage: Language
    url: String!
  }

  type UserConnection {
    edges: [UserEdge]!
    pageInfo: PageInfo!
  }

  type UserEdge {
    cursor: String!
    node: User
  }

  type User implements Node & ProfileOwner & RepositoryOwner {
    avatarUrl: String!
    bio: String
    company: String
    email: String!
    followers(after: String, before: String, first: Int, last: Int): UserConnection!
    following(after: String, before: String, first: Int, last: Int): UserConnection!
    id: ID!
    location: String
    login: String!
    name: String
    organizations(after: String, before: String, first: Int, last: Int): OrganizationConnection!
    repositories(after: String, before: String, first: Int, last: Int): RepositoryConnection!
    starredRepositories(after: String, before: String, first: Int, last: Int): RepositoryConnection!
    url: String!
    websiteUrl: String
  }
`;
