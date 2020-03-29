import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import * as resolve from './resolve';
import { OrganizationType } from '../organization/schema';
import { UserType } from '../user/schema';
import { idType } from '../../utils/schema';


export const RepositoryOwnerInterface = new GraphQLInterfaceType({
  name: 'RepositoryOwner',
  fields: () => ({
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
    id: idType(),
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
  resolveType: value => (value.__typename === 'User' ? UserType : OrganizationType),
});

export const ProfileOwnerInterface = new GraphQLInterfaceType({
  name: 'ProfileOwner',
  fields: () => ({
    id: idType(),
    login: { type: new GraphQLNonNull(GraphQLString) },
  }),
  resolveType: value => (value.__typename === 'User' ? UserType : OrganizationType),
});

export const queryFields = {
  profile: {
    type: ProfileOwnerInterface,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: resolve.Query.profile
  }
};
