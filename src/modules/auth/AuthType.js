const { GraphQLObjectType, GraphQLString } = require("graphql");

module.exports = new GraphQLObjectType({
  name: "Auth",
  fields: () => ({
    token: { type: GraphQLString },
    error: { type: GraphQLString }
  })
});
