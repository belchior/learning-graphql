import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';


export const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
    email: { type: GraphQLString },
    id: { type: new GraphQLNonNull(GraphQLID) },
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: new GraphQLNonNull(GraphQLString) },
  }),
});
