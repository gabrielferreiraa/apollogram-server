const { GraphQLObjectType } = require("graphql");

const { CreateUser, CreatePost, Auth } = require("../mutation");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  description: "The root of all mutations",
  fields: () => ({
    CreateUser,
    CreatePost,
    Auth
  })
});
