import {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { idType, NodeInterface } from '../../utils/schema';
import { RepositoryOwnerInterface } from '../repository/schema';


export const OrganizationType = new GraphQLObjectType({
  interfaces: [NodeInterface, RepositoryOwnerInterface],
  name: 'Organization',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
    email: { type: GraphQLString },
    id: idType(),
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: GraphQLString },
  }),
});
