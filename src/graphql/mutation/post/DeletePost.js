const { GraphQLID } = require("graphql");

const PostType = require("../../../modules/post/PostType");
const PostModel = require("../../../modules/post/PostModel");

module.exports = {
  type: PostType,
  args: {
    id: { type: GraphQLID },
  },
  resolve: async (_, { id }, context) => {
    if (!context.user) return null;

    return await PostModel.findOneAndDelete({ _id: id });
  },
};
