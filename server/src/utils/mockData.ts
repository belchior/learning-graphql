
export const ownerDataOrganization = {
  __typename: 'Organization' as const,
  avatar_url: 'http://acme.com/avatar.jpg',
  email: 'contact@acme.com',
  id: 5610,
  login: 'acme',
  name: 'ACME Corporation',
  url: 'https://github.com/acme',
};

export const ownerDataUser = {
  __typename: 'User' as const,
  avatar_url: 'http://johndoe.com/avatar.jpg',
  email: 'johndoe@email.com',
  id: 5580,
  login: 'johndoe',
  name: 'John Doe',
  url: 'https://github.com/johndoe',
};

export const repositoryDataOrganization = {
  __typename: 'Repository' as const,
  description: 'repo description',
  fork_count: 2,
  id: 5747,
  language_color: '#f1e05a',
  language_name: 'JavaScript',
  license_name: 'MIT License',
  name: 'Repo name',
  owner_login: 'acme',
  owner_ref: 'organizations',
  url: 'https://github.com/userLogin/repo-name',
};

export const repositoryData = {
  __typename: 'Repository' as const,
  description: 'repo description',
  fork_count: 2,
  id: 5747,
  license_name: 'MIT License',
  name: 'Repo name',
  owner_login: 'johndoe',
  owner_ref: 'users',
  language_name: 'JavaScript',
  language_color: '#f1e05a',
  url: 'https://github.com/userLogin/repo-name',
};

export const starredRepositoryData = {
  __typename: 'Repository' as const,
  id: 5747,
  description: 'starred repo description',
  fork_count: 2,
  license_name: 'MIT License',
  name: 'Starred repo name',
  owner_login: 'johndoe',
  owner_ref: 'users',
  language_name: 'JavaScript',
  language_color: '#f1e05a',
  url: 'https://github.com/userLogin/repo-name',
};

export const organizationData = {
  __typename: 'Organization' as const,
  avatar_url: 'http://acme.com/avatar.jpg',
  description: 'ACME Corporation',
  email: 'contact@acme.com',
  id: 5610,
  location: 'world',
  login: 'acme',
  name: 'ACME Corporation',
  people: [ownerDataUser],
  repositories: [repositoryDataOrganization],
  url: 'https://github.com/acme',
  website_url: 'http://acme.com',
};

export const followerData = {
  __typename: 'User' as const,
  avatar_url: 'http://richardroe.com/avatar.jpg',
  email: 'richardroe@email.com',
  id: 5558,
  login: 'richardroe',
  name: 'Richard Roe',
  url: 'https://github.com/richardroe',
};

export const followingData = {
  __typename: 'User' as const,
  avatar_url: 'http://charlydoe.com/avatar.jpg',
  email: 'charlydoe@email.com',
  id: 5747,
  login: 'charlydoe',
  name: 'Charly Doe',
  url: 'https://github.com/charlydoe',
};

export const userData = {
  // starredRepositories: [starredRepositoryData],
  __typename: 'User' as const,
  avatar_url: 'http://johndoe.com/avatar.jpg',
  bio: 'bio description',
  company: 'Company',
  email: 'johndoe@email.com',
  followers: [followerData],
  following: [followingData],
  id: 5558,
  location: 'Brazil',
  login: 'johndoe',
  name: 'John Doe',
  organizations: [organizationData],
  repositories: [repositoryData],
  url: 'https://github.com/johndoe',
  website_url: 'http://johndoe.com',
};
