import { GraphQLNonNull, GraphQLString, } from 'graphql';

import * as organizationResolve from '../entities/organization/resolve';
import * as userResolve from '../entities/user/resolve';
import { OrganizationType, UserType, } from './types';


export const queryFields = {
  organization: {
    type: OrganizationType,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: organizationResolve.Query.organization
  },

  user: {
    type: UserType,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: userResolve.Query.user
  },
};
