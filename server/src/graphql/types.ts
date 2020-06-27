import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInterfaceType,
} from 'graphql';


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
    id: idType(),
    location: { type: GraphQLString },
    login: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLString },
    url: { type: new GraphQLNonNull(GraphQLString) },
    websiteUrl: { type: GraphQLString },
  }),
});
