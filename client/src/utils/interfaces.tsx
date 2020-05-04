import { ChangeEvent } from 'react';


interface Edge {
  node: any
}
export interface CursorConnection {
  edges: Edge[]
}


interface ILicense {
  name: string
}

interface ILanguage {
  color: string
  name: string
}

export interface IRepository {
  description: string
  forkCount: number
  id: string
  licenseInfo?: ILicense
  name: string
  owner: IRepositoryOwner
  primaryLanguage?: ILanguage
  url: string
}

interface INode {
  id: string
}

export interface IProfileOwner extends INode {
  avatarUrl: string
  login: string
  name?: string
  url: string
  __typename: string
}

export interface IRepositoryOwner extends INode {
  avatarUrl: string
  login: string
  url: string
  repositories?: CursorConnection
}

export interface IUser extends IProfileOwner, IRepositoryOwner {
  avatarUrl: string
  bio?: string
  company?: string
  email: string
  followers?: CursorConnection
  following?: CursorConnection
  id: string
  location?: string
  login: string
  name?: string
  starredRepositories?: CursorConnection
  organizations?: CursorConnection
  url: string
  websiteUrl?: string
  __typename: 'User'
}

export interface IOrganization extends IProfileOwner, IRepositoryOwner {
  avatarUrl: string
  description?: string
  email?: string
  location?: string
  login: string
  name?: string
  people?: CursorConnection
  repositories?: CursorConnection
  url: string
  websiteUrl?: string
  __typename: 'Organization'
}

export type TEventFn = (event: ChangeEvent<{}>, value: any) => void

export type THookTuple = [any, Function]

export type TUserTabs = 'repositories' | 'starredRepositories' | 'followers' | 'following'
export type TOrganizationTabs = 'repositories' | 'people'
export type TTabs = TUserTabs | TOrganizationTabs
