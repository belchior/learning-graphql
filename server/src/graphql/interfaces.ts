import { Types } from 'mongoose';

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


/*
  Output arguments
*/
export interface IOwnerArg {
  login: string
}


/*
  Output
*/
interface INodeOutput {
  id: Types.ObjectId
}
export interface IRepositoryOwnerOutput extends INodeOutput {
  avatarUrl: string
  login: string
  name?: string
  url: string
  __typename: 'Organization' | 'User'
}
interface IProfileOwnerOutput extends INodeOutput {
  avatarUrl: string
  login: string
  name?: string
  url: string
}
interface ILicenseOutput {
  name: string
}
interface ILanguageOutput {
  color: string
  name: string
}
export interface IRepositoryOutput extends INodeOutput{
  description?: string
  forkCount: number
  licenseInfo?: ILicenseOutput
  name: string
  owner: IRepositoryOwnerOutput,
  primaryLanguage?: ILanguageOutput
  url: string
  __typename: 'Repository'
}
export interface IOrganizationOutput extends INodeOutput, IProfileOwnerOutput, IRepositoryOwnerOutput {
  avatarUrl: string
  description?: string
  email?: string
  location?: string
  login: string
  name?: string
  people?: IUserOutput[]
  repositories?: IRepositoryOutput[]
  url: string
  websiteUrl?: string
  __typename: 'Organization'
}
export interface IUserOutput extends INodeOutput, IProfileOwnerOutput, IRepositoryOwnerOutput {
  avatarUrl: string
  bio?: string
  company?: string
  email: string
  followers?: IUserOutput[]
  following?: IUserOutput[]
  location?: string
  login: string
  name?: string
  organizations?: IOrganizationOutput[]
  repositories?: IRepositoryOutput[]
  starredRepositories?: IRepositoryOutput[]
  url: string
  websiteUrl?: string
  __typename: 'User'
}
