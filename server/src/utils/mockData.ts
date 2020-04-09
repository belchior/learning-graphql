import { Types } from 'mongoose';
import { IUserOutput, IRepositoryOutput, IOrganizationOutput, IPageInfo } from '../graphql/interfaces';

const ownerDataUser: IUserOutput = {
  __typename: 'User',
  avatarUrl: 'http://johndoe.com/avatar.jpg',
  email: 'johndoe@email.com',
  id: Types.ObjectId('5e5580d6f72291487ec648cf'),
  login: 'johndoe',
  name: 'John Doe',
  url: 'https://github.com/johndoe',
};

const repositoryData: IRepositoryOutput = {
  __typename: 'Repository',
  description: 'repo description',
  forkCount: 2,
  id: Types.ObjectId('5e74ce7ff3bb02311c781c0e'),
  licenseInfo: { name: 'MIT License' },
  name: 'Repo name',
  owner: ownerDataUser,
  primaryLanguage: { name: 'JavaScript', color: '#f1e05a', },
  url: 'https://github.com/userLogin/repo-name',
};

const starredRepositoryData: IRepositoryOutput = {
  __typename: 'Repository',
  description: 'starred repo description',
  forkCount: 2,
  id: Types.ObjectId('5e74ce7ff3bb02311c781c0e'),
  licenseInfo: { name: 'MIT License' },
  name: 'Starred repo name',
  owner: ownerDataUser,
  primaryLanguage: { name: 'JavaScript', color: '#f1e05a', },
  url: 'https://github.com/userLogin/repo-name',
};

const organizationData: IOrganizationOutput = {
  __typename: 'Organization',
  avatarUrl: 'http://acme.com/avatar.jpg',
  email: 'contact@acme.com',
  id: Types.ObjectId('5e61c002081d28c0fd5c3489'),
  location: 'world',
  login: 'acme',
  name: 'ACME Corporation',
  people: [ownerDataUser],
  repositories: [repositoryData],
  url: 'https://github.com/acme',
  websiteUrl: 'http://acme.com',
};

const followerData: IUserOutput = {
  __typename: 'User',
  avatarUrl: 'http://richardroe.com/avatar.jpg',
  email: 'richardroe@email.com',
  id: Types.ObjectId('5e5580d6f72291487ec648d1'),
  login: 'richardroe',
  name: 'Richard Roe',
  url: 'https://github.com/richardroe',
};

const followingData: IUserOutput = {
  __typename: 'User',
  avatarUrl: 'http://charlydoe.com/avatar.jpg',
  email: 'charlydoe@email.com',
  id: Types.ObjectId('5e74ce7ff3bb02311c781c20'),
  login: 'charlydoe',
  name: 'Charly Doe',
  url: 'https://github.com/charlydoe',
};

const userData: IUserOutput = {
  __typename: 'User',
  avatarUrl: 'http://johndoe.com/avatar.jpg',
  bio: 'bio description',
  company: 'Company',
  email: 'johndoe@email.com',
  followers: [followerData],
  following: [followingData],
  id: Types.ObjectId('5e5580d6f72291487ec648cf'),
  location: 'Brazil',
  login: 'johndoe',
  name: 'John Doe',
  organizations: [organizationData],
  repositories: [repositoryData],
  starredRepositories: [starredRepositoryData],
  url: 'https://github.com/johndoe',
  websiteUrl: 'http://johndoe.com',
};

const pageInfo: IPageInfo = {
  hasPreviousPage: false,
  hasNextPage: false,
};

export {
  followerData,
  followingData,
  organizationData,
  ownerDataUser,
  pageInfo,
  repositoryData,
  starredRepositoryData,
  userData,
};
