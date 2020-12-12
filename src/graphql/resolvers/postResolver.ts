import { AuthenticationError } from "apollo-server";

import { Resolvers } from "../../types";
import { Context } from "../../context";

const resolvers: Resolvers<Context> = {
  Query: {
    posts: async (_: any, __: any, { me, models: { post } }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      return await post.find().populate("user");
    },
  },
  Mutation: {
    createPost: (_: any, { title, content }, { me, models: { post } }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      return new post({
        title,
        content,
        user: me._id,
      }).save();
    },
    deletePost: async (_: any, { id }, { me, models: { post } }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      return await post.findOneAndDelete({ _id: id });
    },
  },
};

export default resolvers;
