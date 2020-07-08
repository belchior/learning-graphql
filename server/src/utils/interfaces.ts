import DataLoader from 'dataloader';


/*
  Entities
*/
export type TUser = {
  __typename: 'User'
  avatar_url: string
  bio?: string
  company?: string
  email: string
  id: string
  location?: string
  login: string
  name?: string
  url: string
  website_url?: string
}

export type TOrganization = {
  __typename: 'Organization'
  avatar_url: string
  description?: string
  email?: string
  id: string
  location?: string
  login: string
  name?: string
  url: string
  website_url?: string
}

export type TEntity = TUser | TOrganization


/*
  Resolve Arguments
*/

export type TArgs = {
  [keyName: string]: any
}

export type TGraphQLContext = {
  loader: {
    [key: string]: DataLoader<string, TUser>
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

export type TPageInfoFnQuery = (args: TPageInfoFnQueryArgs) => string

export type TFindPageInfoArgs<T> = {
  items: T[]
  pageInfoFnQuery: TPageInfoFnQuery
}

export type TCursorConnectionArgs = {
  itemsQuery: string
  pageInfoFnQuery: TPageInfoFnQuery
}

export type TCursorConnection<T> = {
  edges: TEdge<T>[],
  pageInfo: TPageInfo
}
