
const ownerData = {
  __typename: 'User',
  _id: '5e5580d6f72291487ec648cf',
  avatarUrl: 'http://johndoe.com/avatar.jpg',
  id: '5e5580d6f72291487ec648cf',
  login: 'johndoe',
  name: 'John Doe',
  url: 'https://github.com/johndoe',
};

const repositoryData = {
  __typename: 'Repository',
  _id: '5e74ce7ff3bb02311c781c0e',
  description: 'repo description',
  forkCount: 2,
  id: '5e74ce7ff3bb02311c781c0e',
  licenseInfo: { name: 'MIT License' },
  name: 'Repo name',
  owner: ownerData,
  primaryLanguage: { name: 'JavaScript', color: '#f1e05a', },
  url: 'https://github.com/userLogin/repo-name',
};

const starredRepositoryData = {
  __typename: 'Repository',
  _id: '5e74ce7ff3bb02311c781c0e',
  description: 'starred repo description',
  forkCount: 2,
  id: '5e74ce7ff3bb02311c781c0e',
  licenseInfo: { name: 'MIT License' },
  name: 'Starred repo name',
  owner: ownerData,
  primaryLanguage: { name: 'JavaScript', color: '#f1e05a', },
  url: 'https://github.com/userLogin/repo-name',
};

const organizationData = {
  __typename: 'Organization',
  _id: '5e61c002081d28c0fd5c3489',
  avatarUrl: 'http://acme.com/avatar.jpg',
  email: 'contact@acme.com',
  id: '5e61c002081d28c0fd5c3489',
  location: 'world',
  login: 'acme',
  name: 'ACME Corporation',
  people: [ownerData],
  repositories: [repositoryData],
  url: 'https://github.com/acme',
  websiteUrl: 'http://acme.com',
};

const followerData = {
  _id: '5e5580d6f72291487ec648d1',
  avatarUrl: 'http://richardroe.com/avatar.jpg',
  id: '5e5580d6f72291487ec648d1',
  login: 'richardroe',
  name: 'Richard Roe',
  url: 'https://github.com/richardroe',
};

const followingData = {
  _id: '5e74ce7ff3bb02311c781c20',
  avatarUrl: 'http://charlydoe.com/avatar.jpg',
  id: '5e74ce7ff3bb02311c781c20',
  login: 'charlydoe',
  name: 'Charly Doe',
  url: 'https://github.com/charlydoe',
};

const userData = {
  __typename: 'User',
  _id: '5e5580d6f72291487ec648cf',
  avatarUrl: 'http://johndoe.com/avatar.jpg',
  bio: 'bio description',
  company: 'Company',
  email: 'johndoe@email.com',
  followers: [followerData],
  following: [followingData],
  id: '5e5580d6f72291487ec648cf',
  location: 'Brazil',
  login: 'johndoe',
  name: 'John Doe',
  organizations: [organizationData],
  repositories: [repositoryData],
  starredRepositories: [starredRepositoryData],
  url: 'https://github.com/johndoe',
  websiteUrl: 'http://johndoe.com',
};

const pageInfo = {
  hasPreviousPage: false,
  hasNextPage: false,
};

export {
  pageInfo,
  repositoryData,
  starredRepositoryData,
  organizationData,
  followerData,
  followingData,
  userData,
};
