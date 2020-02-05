const { GraphQLString, GraphQLNonNull } = require("graphql");

const PostType = require("../../../modules/post/PostType");
const PostModel = require("../../../modules/post/PostModel");

module.exports = {
  type: PostType,
  args: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) }
  },
  resolve(_, { title, content }, context) {
    if (!context.user) return null;

    const post = new PostModel({
      title,
      content,
      user: context.user
    });

    return post.save();
  }
};
