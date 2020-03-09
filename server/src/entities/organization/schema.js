import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';


export const Organization = new GraphQLObjectType({
  name: 'Organization',
  fields: () => ({
    avatarUrl: { type: GraphQLString },
    id: { type: new GraphQLNonNull(GraphQLID) },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    url: { type: new GraphQLNonNull(GraphQLString) },
  }),
});