
export const ownerDataOrganization = {
  __typename: 'Organization',
  id: '5e61c002081d28c0fd5c3489',
  avatar_url: 'http://acme.com/avatar.jpg',
  email: 'contact@acme.com',
  login: 'acme',
  name: 'ACME Corporation',
  url: 'https://github.com/acme',
};

export const ownerDataUser = {
  __typename: 'User',
  id: '5e5580d6f72291487ec648cf',
  avatar_url: 'http://johndoe.com/avatar.jpg',
  email: 'johndoe@email.com',
  login: 'johndoe',
  name: 'John Doe',
  url: 'https://github.com/johndoe',
};

export const repositoryDataOrganization = {
  __typename: 'Repository',
  id: '5e74ce7ff3bb02311c781c0e',
  description: 'repo description',
  fork_count: 2,
  license_info: { name: 'MIT License' },
  name: 'Repo name',
  owner: { id: ownerDataOrganization.id, ref: 'organizations' },
  primary_language: { name: 'JavaScript', color: '#f1e05a', },
  url: 'https://github.com/userLogin/repo-name',
};

export const repositoryData = {
  __typename: 'Repository',
  id: '5e74ce7ff3bb02311c781c0e',
  description: 'repo description',
  fork_count: 2,
  license_info: { name: 'MIT License' },
  name: 'Repo name',
  owner: { id: ownerDataUser.id, ref: 'users' },
  primary_language: { name: 'JavaScript', color: '#f1e05a', },
  url: 'https://github.com/userLogin/repo-name',
};

export const starredRepositoryData = {
  __typename: 'Repository',
  id: '5e74ce7ff3bb02311c781c0e',
  description: 'starred repo description',
  fork_count: 2,
  license_info: { name: 'MIT License' },
  name: 'Starred repo name',
  owner: ownerDataUser,
  primary_language: { name: 'JavaScript', color: '#f1e05a', },
  url: 'https://github.com/userLogin/repo-name',
};

export const organizationData = {
  __typename: 'Organization' as const,
  avatar_url: 'http://acme.com/avatar.jpg',
  description: 'ACME Corporation',
  email: 'contact@acme.com',
  id: '5e61c002081d28c0fd5c3489',
  location: 'world',
  login: 'acme',
  name: 'ACME Corporation',
  people: [ownerDataUser],
  repositories: [repositoryData],
  url: 'https://github.com/acme',
  website_url: 'http://acme.com',
};

export const followerData = {
  __typename: 'User',
  id: '5e5580d6f72291487ec648d1',
  avatar_url: 'http://richardroe.com/avatar.jpg',
  email: 'richardroe@email.com',
  login: 'richardroe',
  name: 'Richard Roe',
  url: 'https://github.com/richardroe',
};

export const followingData = {
  __typename: 'User',
  id: '5e74ce7ff3bb02311c781c20',
  avatar_url: 'http://charlydoe.com/avatar.jpg',
  email: 'charlydoe@email.com',
  login: 'charlydoe',
  name: 'Charly Doe',
  url: 'https://github.com/charlydoe',
};

export const userData = {
  // repositories: [repositoryData],
  // starredRepositories: [starredRepositoryData],
  __typename: 'User' as const,
  avatar_url: 'http://johndoe.com/avatar.jpg',
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
  url: 'https://github.com/johndoe',
  website_url: 'http://johndoe.com',
};
