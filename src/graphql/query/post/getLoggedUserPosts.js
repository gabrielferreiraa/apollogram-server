const { GraphQLList, GraphQLNonNull, GraphQLString } = require("graphql");

const PostType = require("../../../modules/post/PostType");
const PostModel = require("../../../modules/post/PostModel");

module.exports = {
  type: new GraphQLList(PostType),
  resolve: async (_, { id }, context) => {
    if (!context.user) return null;

    const { _id } = context.user;

    return await PostModel.find({
      user: _id,
    })
      .populate("user")
      .sort({ createdAt: -1 });
  },
};
