const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "User",
  description: "User data",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    picture: { type: GraphQLString },
  }),
});
