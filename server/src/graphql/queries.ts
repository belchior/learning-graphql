import { GraphQLNonNull, GraphQLString, } from 'graphql';

import * as organizationResolve from '../entities/organization/resolve';
import * as ownerResolve from '../entities/owner/resolve';
import * as userResolve from '../entities/user/resolve';
import { OrganizationType, ProfileOwnerInterface, UserType, } from './types';


export const queryFields = {
  organization: {
    type: OrganizationType,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: organizationResolve.Query.organization
  },

  profile: {
    type: ProfileOwnerInterface,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: ownerResolve.Query.profile
  },

  user: {
    type: UserType,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: userResolve.Query.user
  },
};
