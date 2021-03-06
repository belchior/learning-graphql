import { IOrganization, IRepository, IUser } from './interfaces';


export const organizationMockResolvers = {
  ID: () => organization.id,
  Organization: () => organization,
};

export const repositoryMockResolvers = {
  ID: () => repository.id,
  Repository: () => repository,
};

export const userMockResolvers = {
  ID: () => user.id,
  User: () => user,
  Repository: repositoryMockResolvers.Repository,
};

export const  profileOwnerUser: IUser = {
  __typename: 'User',
  avatarUrl: 'path/to/avatarUrl.png',
  bio: 'Software developer',
  company: 'Company',
  email: 'belchior@email.com',
  id: '48ce',
  location: 'Brazil',
  login: 'belchior',
  name: 'Belchior Oliveira',
  url: '/belchior',
  websiteUrl: 'https://github.com/belchior',
};

export const organization: IOrganization = {
  __typename: 'Organization',
  avatarUrl: 'path/to/avatarUrl.png',
  description: 'Ecma International, Technical Committee 39 - ECMAScript',
  id: '1234',
  location: 'The web',
  login: 'tc39',
  name: 'Ecma TC39',
  people: { edges: [ { node: profileOwnerUser }, ] },
  url: 'https://github.com/tc39',
  websiteUrl: 'https://www.ecma-international.org/memento/tc39-rf-tg.htm',
};

export const repository: IRepository = {
  __typename: 'Repository',
  description: 'repository description',
  forkCount: 123,
  id: 'ba86',
  licenseInfo: {
    name: 'MIT',
  },
  name: 'learning-graphql',
  owner: profileOwnerUser,
  primaryLanguage: {
    color: '#f1e05a',
    name: 'JavaScript'
  },
  url: 'https://github.com/belchior/learning-graphql',
};

export const user: IUser = {
  __typename: 'User',
  avatarUrl: 'path/to/avatarUrl.png',
  bio: 'Software developer',
  email: 'belchior@email.com',
  followers: { edges: [ { node: profileOwnerUser } ] },
  following: { edges: [ { node: profileOwnerUser } ] },
  id: '48ce',
  login: 'belchior',
  name: 'Belchior Oliveira',
  organizations: { edges: [ { node: organization } ] },
  repositories: { edges: [ { node: repository } ] },
  starredRepositories: { edges: [ { node: repository } ] },
  url: '/belchior',
  websiteUrl: 'https://github.com/belchior',
};





