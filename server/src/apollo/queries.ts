import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    organization(login: String!): Organization
    profile(login: String!): ProfileOwner
    user(login: String!): User
  }
`;
