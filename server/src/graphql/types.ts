import {
  GraphQLID,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import * as userResolve from '../entities/user/resolve';
import { connectionType, connectionTypeArgs } from '../cursor-connection/types';


export const idType = () => ({
  type: new GraphQLNonNull(GraphQLID),
});

const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
  }),
});

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  interfaces: [NodeInterface],
  name: 'User',
  fields: () => ({
    avatarUrl: { type: new GraphQLNonNull(GraphQLString) },
    bio: { type: GraphQLString },
    company: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    followers: {
      type: UserConnectionType,
      args: connectionTypeArgs(),
      resolve: userResolve.User.followers,
    },
    following: {
      type: UserConnectionType,
      args: connectionTypeArgs(),
      resolve: userResolve.User.following,
    },
    id: idType(),
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: GraphQLString },
  }),
});

const UserConnectionType = connectionType(UserType);
