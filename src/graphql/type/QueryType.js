const { GraphQLObjectType } = require("graphql");
const {
  getUserByEmail,
  getAllUsers,
  getAutenticatedUser,
  getAllPosts,
  getLoggedUserPosts,
} = require("../query");

module.exports = new GraphQLObjectType({
  name: "Query",
  description: "The root of all queries",
  fields: () => ({
    getAllUsers,
    getUserByEmail,
    getAutenticatedUser,
    getAllPosts,
    getLoggedUserPosts,
  }),
});
