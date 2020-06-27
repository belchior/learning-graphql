import DataLoader from 'dataloader';


export interface IUser {
  id: string
  avatarUrl: string
  bio: string
  company: string
  email: string
  location: string
  login: string
  name: string
  url: string
  websiteUrl: string
  __typename: 'User'
}


export type TArgs = {
  [keyName: string]: any
}
export interface IGraphQLContext {
  loader: {
    [key: string]: DataLoader<string, IUser>
  }
}
