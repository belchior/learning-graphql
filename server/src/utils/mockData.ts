import { Types } from 'mongoose';

export const ownerDataUser = {
  __typename: 'User',
  _id: Types.ObjectId('5e5580d6f72291487ec648cf'),
  avatarUrl: 'http://johndoe.com/avatar.jpg',
  email: 'johndoe@email.com',
  login: 'johndoe',
  name: 'John Doe',
  url: 'https://github.com/johndoe',
};

export const repositoryData = {
  __typename: 'Repository',
  _id: Types.ObjectId('5e74ce7ff3bb02311c781c0e'),
  description: 'repo description',
  forkCount: 2,
  licenseInfo: { name: 'MIT License' },
  name: 'Repo name',
  owner: { _id: ownerDataUser._id, ref: 'users' },
  primaryLanguage: { name: 'JavaScript', color: '#f1e05a', },
  url: 'https://github.com/userLogin/repo-name',
};

export const starredRepositoryData = {
  __typename: 'Repository',
  _id: Types.ObjectId('5e74ce7ff3bb02311c781c0e'),
  description: 'starred repo description',
  forkCount: 2,
  licenseInfo: { name: 'MIT License' },
  name: 'Starred repo name',
  owner: ownerDataUser,
  primaryLanguage: { name: 'JavaScript', color: '#f1e05a', },
  url: 'https://github.com/userLogin/repo-name',
};

export const organizationData = {
  __typename: 'Organization',
  _id: Types.ObjectId('5e61c002081d28c0fd5c3489'),
  avatarUrl: 'http://acme.com/avatar.jpg',
  email: 'contact@acme.com',
  location: 'world',
  login: 'acme',
  name: 'ACME Corporation',
  people: [ownerDataUser],
  repositories: [repositoryData],
  url: 'https://github.com/acme',
  websiteUrl: 'http://acme.com',
};

export const followerData = {
  __typename: 'User',
  _id: Types.ObjectId('5e5580d6f72291487ec648d1'),
  avatarUrl: 'http://richardroe.com/avatar.jpg',
  email: 'richardroe@email.com',
  login: 'richardroe',
  name: 'Richard Roe',
  url: 'https://github.com/richardroe',
};

export const followingData = {
  __typename: 'User',
  _id: Types.ObjectId('5e74ce7ff3bb02311c781c20'),
  avatarUrl: 'http://charlydoe.com/avatar.jpg',
  email: 'charlydoe@email.com',
  login: 'charlydoe',
  name: 'Charly Doe',
  url: 'https://github.com/charlydoe',
};

export const userData = {
  __typename: 'User',
  _id: Types.ObjectId('5e5580d6f72291487ec648cf'),
  avatarUrl: 'http://johndoe.com/avatar.jpg',
  bio: 'bio description',
  company: 'Company',
  email: 'johndoe@email.com',
  followers: [followerData],
  following: [followingData],
  location: 'Brazil',
  login: 'johndoe',
  name: 'John Doe',
  organizations: [organizationData],
  repositories: [repositoryData],
  starredRepositories: [starredRepositoryData],
  url: 'https://github.com/johndoe',
  websiteUrl: 'http://johndoe.com',
};

export const pageInfo = {
  hasPreviousPage: false,
  hasNextPage: false,
};
