import {
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import { idType } from '../../utils/schema';
import { UserType } from '../user/schema';


export const RepositoryOwnerInterface = new GraphQLInterfaceType({
  name: 'RepositoryOwner',
  fields: () => ({
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
    id: idType(),
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
  resolveType: () => UserType,
});
