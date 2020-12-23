import { AuthenticationError } from "apollo-server";

import { Resolvers } from "types";
import { Context } from "context";

const buildFilters = (args: any) => {
  if (!args) return {};

  return Object.keys(args).reduce((acc, val) => {
    return { ...acc, [val]: args[val] };
  }, {});
};

const resolvers: Resolvers<Context> = {
  Post: {
    isOwner: async (parent, __, ctx) => parent.user.equals(ctx.me?._id),
  },
  Query: {
    posts: async (_, args, { me, models: { post } }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      const filters = buildFilters(args.filter);

      return await post.find(filters).populate("user");
    },
  },
  Mutation: {
    createPost: async (
      _: any,
      { title, content },
      { me, models: { post } }
    ) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      const newPost = new post({
        title,
        content,
        user: me._id,
      });

      return await (await newPost.populate("user").save()).execPopulate();
    },
    deletePost: async (_: any, { id }, { me, models: { post } }) => {
      if (!me) throw new AuthenticationError("You are not authenticated");

      return await post.findOneAndDelete({ _id: id });
    },
  },
};

export default resolvers;
