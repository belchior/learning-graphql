import DataLoader from 'dataloader';


/*
  Entities
*/

export type TUser = {
  __typename: 'User'
  avatar_url: string
  bio?: string
  company?: string
  created_at: Date
  email: string
  id: number
  location?: string
  login: string
  name?: string
  url: string
  website_url?: string
}

export type TOrganization = {
  __typename: 'Organization'
  avatar_url: string
  created_at: Date
  description?: string
  email?: string
  id: number
  location?: string
  login: string
  name?: string
  url: string
  website_url?: string
}

export type TOwner = {
  __typename: TUser['__typename'] | TOrganization['__typename']
  avatar_url: string
  id: number
  login: string
  url: string
}

export type TOwnerIdentifier = {
  owner_login: string
  owner_ref: 'users' | 'organizations'
}

export type TRepository = {
  __typename: 'Repository'
  created_at: Date
  description?: string
  fork_count: number
  id: number
  license_name: string
  owner_login: TOwnerIdentifier['owner_login']
  owner_ref: TOwnerIdentifier['owner_ref']
  language_color: string
  language_name: string
  name: string
  url: string
}

export type TStarredRepository = TRepository & { starred_at: Date }

export type TRepositoryOwner = TOwner

export type TEntity =
  | TUser
  | TOrganization
  | TRepository


/*
  Resolve Arguments
*/

export type TArgs = {
  [keyName: string]: any
}

export type TGraphQLContext = {
  loader: {
    [key: string]: DataLoader<string, TEntity>
  }
}


/*
  Pagination
*/

type TOperator = '<' | '>';

type TOrder = 'ASC' | 'DESC';

export type TPrevOrNext = 'prev' | 'next';

export type TPaginationQueryArgs = {
  limit?: number
  reference?: string
  operator: TOperator
  order: TOrder
}

export type TPageInfoItem = {
  row: TPrevOrNext
}

export type TEdge<T> = {
  cursor: string
  node: T
}

export type TPageInfo = {
  endCursor?: string
  hasPreviousPage: boolean
  hasNextPage: boolean
  startCursor?: string
}

export type TForwardPaginationArgs = { first?: number, after?: string }
export type TBackwardPaginationArgs = { last?: number, before?: string }
export type TPaginationArgs = TForwardPaginationArgs & TBackwardPaginationArgs

export type TPageInfoFnQueryArgs = {
  reference: string
  operator: TOperator
  order: TOrder
  row: TPrevOrNext
}
