const { GraphQLObjectType } = require("graphql");
const { getUserByEmail, getAllUsers, getAllPosts } = require("../query");

module.exports = new GraphQLObjectType({
  name: "Query",
  description: "The root of all queries",
  fields: () => ({
    getAllUsers,
    getUserByEmail,
    getAllPosts
  })
});
