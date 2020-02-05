const { GraphQLList } = require("graphql");

const PostType = require("../../../modules/post/PostType");
const PostModel = require("../../../modules/post/PostModel");

module.exports = {
  type: new GraphQLList(PostType),
  resolve: async (_, __, context) => {
    if (!context.user) return null;

    return await PostModel.find({}).populate("user");
  }
};
