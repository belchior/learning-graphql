import { GraphQLNonNull, GraphQLString, } from 'graphql';

import * as userResolve from '../entities/user/resolve';
import { UserType, } from './types';


export const queryFields = {
  user: {
    type: UserType,
    args: { login: { type: new GraphQLNonNull(GraphQLString) } },
    resolve: userResolve.Query.user
  },
};
