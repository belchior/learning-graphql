import { GraphQLNonNull, GraphQLString, } from 'graphql';

import { Query as organizationQuery } from '../entities/organization/resolve';
import { Query as userQuery } from '../entities/user/resolve';
import { OrganizationType, ProfileOwnerInterface, UserType, } from './types';
import { TArgs, TGraphQLContext } from '../utils/interfaces';
import { handleError } from '../utils/error-handler';


const profileResolve = async (parent: undefined, args: TArgs, context: TGraphQLContext) => {
  try {
    const userPromise = userQuery.user(parent, args, context);
    const organizationPromise = organizationQuery.organization(parent, args, context);

    const result = await Promise.allSettled([userPromise, organizationPromise]);

    const item = result.find(item => item.status === 'fulfilled');

    if (item && 'value' in item) return item.value;
    throw new Error(`Profile not found with login: ${args.login}`);
  } catch (error) {
    return handleError(error);
  }
};


export const queryFields = {
  organization: {
    type: OrganizationType,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: organizationQuery.organization
  },

  profile: {
    type: ProfileOwnerInterface,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: profileResolve
  },

  user: {
    type: UserType,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: userQuery.user
  },
};
