const { GraphQLObjectType } = require("graphql");

const {
  CreateUser,
  DeletePost,
  CreatePost,
  UpdateUser,
  Auth,
} = require("../mutation");

module.exports = new GraphQLObjectType({
  name: "Mutation",
  description: "The root of all mutations",
  fields: () => ({
    CreatePost,
    DeletePost,
    CreateUser,
    UpdateUser,
    Auth,
  }),
});
