import DataLoader from 'dataloader';


export interface IUser {
  id: string
  avatarUrl: string
  bio?: string
  company?: string
  email: string
  location?: string
  login: string
  name?: string
  url: string
  websiteUrl?: string
  __typename: 'User'
}
export type TEntity = IUser




export type TArgs = {
  [keyName: string]: any
}
export interface IGraphQLContext {
  loader: {
    [key: string]: DataLoader<string, IUser>
  }
}
export type TOperator = '<' | '>';
export type TOrder = 'ASC' | 'DESC';


/*
  Pagination
*/
export interface IEdge<T> {
  cursor: string
  node: T
}
export interface IPageInfo {
  endCursor?: string
  hasPreviousPage: boolean
  hasNextPage: boolean
  startCursor?: string
}
export interface IPaginationArgs {
  first?: number
  last?: number
  before?: string
  after?: string
}
export interface IPaginationArgs {
  first?: number
  last?: number
  before?: string
  after?: string
}
export interface ICursorConnection<T> {
  edges: IEdge<T>[],
  pageInfo: IPageInfo
}
export interface ICursorConnectionConfig<T> {
  pageInfo: IPageInfo
  items: T[]
}
