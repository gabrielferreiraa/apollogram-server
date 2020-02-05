const {
  GraphQLObjectType,
  GraphQLString
} = require("graphql");

module.exports = new GraphQLObjectType({
  name: "User",
  description: "User data",
  fields: () => ({
    id: { type: GraphQLString, resolve: user => user._id },
    name: { type: GraphQLString, resolve: user => user.name },
    email: { type: GraphQLString, resolve: user => user.email }
  })
});
