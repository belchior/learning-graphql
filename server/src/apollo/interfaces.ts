
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
export interface ICursorConnection<T> {
  edges: IEdge<T>[],
  pageInfo: IPageInfo
}
export interface IPaginationArgs {
  first?: number
  last?: number
  before?: string
  after?: string
}


/*
  Input
*/
export type TArgs = {
  [keyName: string]: any
}
export interface IInputArgs {
  id: string
  input: TArgs
}
