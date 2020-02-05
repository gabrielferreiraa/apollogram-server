const { GraphQLObjectType, GraphQLNonNull, GraphQLString } = require("graphql");

const UserType = require("../user/UserType");

module.exports = new GraphQLObjectType({
  name: "Post",
  description: "Post data",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    user: { type: new GraphQLNonNull(UserType) }
  })
});
