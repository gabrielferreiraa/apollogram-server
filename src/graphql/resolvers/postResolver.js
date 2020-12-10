module.exports = {
  Query: {
    posts: async (_, { user }, { me, models: { post } }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      const conditions = user ? { user } : undefined;

      return await post.find(conditions).populate("user");
    },
  },
  Mutation: {
    createPost: (_, { title, content }, { me, models: { post } }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      return new post({
        title,
        content,
        user: me._id,
      }).save();
    },
    deletePost: async (_, { id }, { me, models: { post } }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      return await post.findOneAndDelete({ _id: id });
    },
  },
};
