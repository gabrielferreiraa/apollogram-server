const {
  GraphQLObjectType,
  GraphQLString
} = require("graphql");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "User data",
  fields: () => ({
    // id: { type: GraphQLString, resolve: user => user.id },
    name: { type: GraphQLString, resolve: user => user.name },
    email: { type: GraphQLString, resolve: user => user.email }
  })
});

module.exports = UserType;
