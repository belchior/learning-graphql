import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { NodeType } from '../../utils/schema';


export const OrganizationType = new GraphQLObjectType({
  interfaces: [NodeType],
  name: 'Organization',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
    email: { type: GraphQLString },
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: parent => parent._id.toString(),
    },
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
